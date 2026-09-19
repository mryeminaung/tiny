export type Station = "lofi" | "rain" | "focus" | "none";

class MusicEngine {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private gains: GainNode[] = [];
  private currentStation: Station = "none";
  private playing = false;
  private intervalIds: ReturnType<typeof setInterval>[] = [];

  private ensureContext() {
    if (!this.ctx || this.ctx.state === "closed") {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  play(station: Station) {
    this.stop();
    if (station === "none") return;

    const ctx = this.ensureContext();
    this.currentStation = station;
    this.playing = true;

    switch (station) {
      case "lofi":
        this.playLofi(ctx);
        break;
      case "rain":
        this.playRain(ctx);
        break;
      case "focus":
        this.playFocus(ctx);
        break;
    }
  }

  stop() {
    this.playing = false;
    this.currentStation = "none";
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = [];
    this.nodes.forEach((n) => {
      try {
        if ("stop" in n && typeof (n as OscillatorNode).stop === "function") {
          (n as OscillatorNode).stop();
        }
      } catch {}
    });
    this.gains.forEach((g) => {
      try {
        g.gain.setValueAtTime(0, this.ctx?.currentTime ?? 0);
      } catch {}
    });
    this.nodes = [];
    this.gains = [];
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close();
    }
    this.ctx = null;
  }

  toggle(station: Station) {
    if (this.playing && this.currentStation === station) {
      this.stop();
    } else {
      this.play(station);
    }
  }

  isPlaying() {
    return this.playing;
  }

  getStation() {
    return this.currentStation;
  }

  // ── Lo-fi: detuned chord pad with slow LFO ──
  private playLofi(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);
    master.connect(ctx.destination);

    const notes = [261.63, 329.63, 392.0, 493.88]; // C4, E4, G4, B4
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
    lfoGain.gain.setValueAtTime(3, ctx.currentTime);
    lfo.connect(lfoGain);
    lfo.start();
    this.nodes.push(lfo);

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime);
      osc.detune.setValueAtTime(-10 + i * 5, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      lfoGain.connect(osc.detune);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start();
      this.nodes.push(osc);
      this.gains.push(gain);
    });

    // Slow chord changes
    const chordSets = [
      [261.63, 329.63, 392.0, 493.88],
      [220.0, 277.18, 329.63, 440.0],
      [246.94, 311.13, 369.99, 493.88],
      [293.66, 349.23, 440.0, 523.25],
    ];
    let chordIdx = 0;
    const id = setInterval(() => {
      if (!this.playing) return;
      chordIdx = (chordIdx + 1) % chordSets.length;
      const chord = chordSets[chordIdx];
      const oscs = this.nodes.filter((n) => n instanceof OscillatorNode) as OscillatorNode[];
      oscs.forEach((osc, i) => {
        osc.frequency.linearRampToValueAtTime(chord[i] * 0.5, (this.ctx?.currentTime ?? 0) + 3);
      });
    }, 8000);
    this.intervalIds.push(id);
  }

  // ── Rain: filtered noise with random droplets ──
  private playRain(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);
    master.connect(ctx.destination);

    // Base rain noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3000, ctx.currentTime);
    filter.Q.setValueAtTime(0.5, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    this.nodes.push(noise);
    this.gains.push(noiseGain);

    // Random raindrops
    const id = setInterval(() => {
      if (!this.playing) return;
      const dropOsc = ctx.createOscillator();
      const dropGain = ctx.createGain();
      dropOsc.type = "sine";
      dropOsc.frequency.setValueAtTime(800 + Math.random() * 2000, ctx.currentTime);
      dropGain.gain.setValueAtTime(0.02 + Math.random() * 0.03, ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      dropOsc.connect(dropGain);
      dropGain.connect(master);
      dropOsc.start();
      dropOsc.stop(ctx.currentTime + 0.15);
    }, 150 + Math.random() * 200);
    this.intervalIds.push(id);
  }

  // ── Focus: binaural beat + pad ──
  private playFocus(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    master.connect(ctx.destination);

    // Alpha wave binaural beat (10Hz difference)
    const baseFreq = 200;

    // Left ear
    const oscL = ctx.createOscillator();
    const gainL = ctx.createGain();
    oscL.type = "sine";
    oscL.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    gainL.gain.setValueAtTime(0.15, ctx.currentTime);
    oscL.connect(gainL);
    gainL.connect(master);
    oscL.start();
    this.nodes.push(oscL);
    this.gains.push(gainL);

    // Right ear (10Hz offset for alpha waves)
    const oscR = ctx.createOscillator();
    const gainR = ctx.createGain();
    oscR.type = "sine";
    oscR.frequency.setValueAtTime(baseFreq + 10, ctx.currentTime);
    gainR.gain.setValueAtTime(0.15, ctx.currentTime);
    oscR.connect(gainR);
    gainR.connect(master);
    oscR.start();
    this.nodes.push(oscR);
    this.gains.push(gainR);

    // Subtle pad underneath
    const padFreqs = [100, 150, 200];
    padFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start();
      this.nodes.push(osc);
      this.gains.push(gain);
    });

    // Slow frequency drift for organic feel
    const id = setInterval(() => {
      if (!this.playing) return;
      const drift = Math.random() * 4 - 2;
      oscL.frequency.linearRampToValueAtTime(baseFreq + drift, (this.ctx?.currentTime ?? 0) + 2);
      oscR.frequency.linearRampToValueAtTime(baseFreq + 10 + drift, (this.ctx?.currentTime ?? 0) + 2);
    }, 5000);
    this.intervalIds.push(id);
  }
}

export const musicEngine = new MusicEngine();
