import { motion } from "motion/react";

function Orb({ className, delay = 0 }: { className?: string; delay?: number }) {
	return (
		<motion.div
			className={className}
			animate={{
				y: [0, -20, 0],
				x: [0, 8, -5, 0],
				scale: [1, 1.1, 0.95, 1],
			}}
			transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
		/>
	);
}

function GlowOrb({ color, size, top, left, delay = 0 }: { color: string; size: string; top: string; left: string; delay?: number }) {
	return (
		<motion.div
			className={`absolute rounded-full blur-3xl opacity-20 ${size}`}
			style={{ background: color, top, left }}
			animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
			transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
		/>
	);
}

export function BackgroundEffects() {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
			{/* ── Large glow orbs ── */}
			<GlowOrb color="#a78bfa" size="w-80 h-80" top="-15%" left="5%" delay={0} />
			<GlowOrb color="#fb7185" size="w-64 h-64" top="10%" left="72%" delay={1} />
			<GlowOrb color="#38bdf8" size="w-72 h-72" top="50%" left="10%" delay={2} />
			<GlowOrb color="#fbbf24" size="w-56 h-56" top="65%" left="78%" delay={0.5} />
			<GlowOrb color="#34d399" size="w-48 h-48" top="82%" left="35%" delay={1.5} />
			<GlowOrb color="#f472b6" size="w-52 h-52" top="30%" left="55%" delay={0.8} />
			<GlowOrb color="#60a5fa" size="w-44 h-44" top="75%" left="60%" delay={1.2} />

			{/* ── Medium orbs ── */}
			<GlowOrb color="#c084fc" size="w-36 h-36" top="20%" left="40%" delay={1.8} />
			<GlowOrb color="#f97316" size="w-32 h-32" top="45%" left="85%" delay={0.3} />
			<GlowOrb color="#10b981" size="w-28 h-28" top="90%" left="15%" delay={2.2} />
			<GlowOrb color="#e879f9" size="w-34 h-34" top="5%" left="60%" delay={1.1} />

			{/* ── Small orbs ── */}
			<GlowOrb color="#fbbf24" size="w-20 h-20" top="35%" left="25%" delay={0.7} />
			<GlowOrb color="#38bdf8" size="w-16 h-16" top="60%" left="90%" delay={1.9} />
			<GlowOrb color="#a78bfa" size="w-24 h-24" top="88%" left="70%" delay={0.4} />
			<GlowOrb color="#fb7185" size="w-18 h-18" top="15%" left="20%" delay={2.5} />

			{/* ── Floating particles (small) ── */}
			<Orb className="absolute top-[8%] left-[6%] size-2 rounded-full bg-violet-400/35" delay={0} />
			<Orb className="absolute top-[18%] right-[8%] size-3 rounded-full bg-rose-400/30" delay={0.8} />
			<Orb className="absolute top-[30%] left-[15%] size-1.5 rounded-full bg-amber-400/35" delay={1.2} />
			<Orb className="absolute top-[42%] right-[12%] size-2.5 rounded-full bg-sky-400/30" delay={0.4} />
			<Orb className="absolute top-[55%] left-[3%] size-1 rounded-full bg-emerald-400/25" delay={1.6} />
			<Orb className="absolute top-[25%] right-[25%] size-2 rounded-full bg-primary/20" delay={2} />
			<Orb className="absolute top-[70%] left-[20%] size-3 rounded-full bg-rose-400/20" delay={0.6} />
			<Orb className="absolute top-[48%] right-[3%] size-1.5 rounded-full bg-violet-400/25" delay={1.4} />
			<Orb className="absolute top-[78%] left-[45%] size-2 rounded-full bg-amber-400/20" delay={0.9} />
			<Orb className="absolute top-[12%] left-[35%] size-1 rounded-full bg-sky-400/25" delay={1.7} />
			<Orb className="absolute top-[62%] right-[30%] size-2.5 rounded-full bg-emerald-400/20" delay={2.3} />
			<Orb className="absolute top-[35%] left-[50%] size-1.5 rounded-full bg-primary/15" delay={0.2} />
			<Orb className="absolute top-[85%] right-[15%] size-2 rounded-full bg-rose-400/15" delay={1.1} />
			<Orb className="absolute top-[5%] right-[40%] size-1 rounded-full bg-violet-400/20" delay={2.8} />
			<Orb className="absolute top-[92%] left-[10%] size-1.5 rounded-full bg-amber-400/15" delay={0.5} />
		</div>
	);
}
