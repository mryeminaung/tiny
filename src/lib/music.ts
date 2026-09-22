export type Station = "lofi" | "jazz" | "rain" | "waves" | "forest" | "coffee" | "focus" | "none";

export interface StationMeta {
	id: Station;
	label: string;
	emoji: string;
	description: string;
}

export const stations: StationMeta[] = [
	{ id: "lofi", label: "Lo-fi", emoji: "🎵", description: "Chill beats to relax to" },
	{ id: "jazz", label: "Jazz", emoji: "🎷", description: "Smooth saxophone vibes" },
	{ id: "rain", label: "Rain", emoji: "🌧️", description: "Soft rainfall sounds" },
	{ id: "waves", label: "Waves", emoji: "🌊", description: "Ocean shore ambience" },
	{ id: "forest", label: "Forest", emoji: "🌲", description: "Birds and rustling leaves" },
	{ id: "coffee", label: "Café", emoji: "☕", description: "Coffee shop chatter" },
	{ id: "focus", label: "Focus", emoji: "🧠", description: "Binaural beats for deep work" },
];

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
      case "jazz":
        this.playJazz(ctx);
        break;
      case "rain":
        this.playRain(ctx);
        break;
      case "waves":
        this.playWaves(ctx);
        break;
      case "forest":
        this.playForest(ctx);
        break;
      case "coffee":
        this.playCoffee(ctx);
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

  // ── Jazz: warm Rhodes-like chord pad with walking feel ──
  private playJazz(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    master.connect(ctx.destination);

    // Jazz voicings: 7th and 9th chords
    const chordSets = [
      [220.0, 277.18, 329.63, 415.30],  // Am7
      [196.0, 246.94, 293.66, 369.99],  // Gmaj7
      [174.61, 220.0, 261.63, 329.63],  // Fmaj7
      [164.81, 207.65, 246.94, 311.13], // Em7
    ];
    let chordIdx = 0;

    const playChord = (freqs: number[]) => {
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.Q.setValueAtTime(0.7, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.3);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.5);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start();
        osc.stop(ctx.currentTime + 4);
        this.nodes.push(osc);
        this.gains.push(gain);
      });
    };

    playChord(chordSets[chordIdx]);
    const id = setInterval(() => {
      if (!this.playing) return;
      chordIdx = (chordIdx + 1) % chordSets.length;
      playChord(chordSets[chordIdx]);
    }, 3500);
    this.intervalIds.push(id);
  }

  // ── Rain: filtered noise with random droplets ──
  private playRain(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);
    master.connect(ctx.destination);

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

  // ── Waves: slow amplitude-modulated noise ──
  private playWaves(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(0.3, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);

    // Slow wave LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(noiseGain.gain);
    lfo.start();

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    this.nodes.push(noise, lfo);
    this.gains.push(noiseGain);
  }

  // ── Forest: high-pitched chirps + soft wind ──
  private playForest(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    master.connect(ctx.destination);

    // Soft wind base
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const wind = ctx.createBufferSource();
    wind.buffer = buffer;
    wind.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.setValueAtTime(400, ctx.currentTime);
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.15, ctx.currentTime);
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);
    wind.start();
    this.nodes.push(wind);
    this.gains.push(windGain);

    // Bird chirps
    const id = setInterval(() => {
      if (!this.playing) return;
      if (Math.random() > 0.4) return; // skip some for natural feel
      const chirpCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < chirpCount; i++) {
        setTimeout(() => {
          if (!this.playing) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          const baseFreq = 2000 + Math.random() * 2000;
          osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(baseFreq * 1.2, ctx.currentTime + 0.05);
          osc.frequency.linearRampToValueAtTime(baseFreq * 0.9, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.connect(gain);
          gain.connect(master);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }, i * 120);
      }
    }, 600 + Math.random() * 800);
    this.intervalIds.push(id);
  }

  // ── Coffee: muffled chatter + clinking ──
  private playCoffee(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
    master.connect(ctx.destination);

    // Muffled chatter (filtered noise)
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.1, ctx.currentTime);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    this.nodes.push(noise);
    this.gains.push(noiseGain);

    // Occasional clink
    const id = setInterval(() => {
      if (!this.playing) return;
      if (Math.random() > 0.3) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2000 + Math.random() * 3000, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }, 800 + Math.random() * 1500);
    this.intervalIds.push(id);
  }

  // ── Focus: binaural beat + pad ──
  private playFocus(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 2);
    master.connect(ctx.destination);

    const baseFreq = 200;

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
