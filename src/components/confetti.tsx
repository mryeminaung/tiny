import { useState } from "react";

const CONFETTI_COLORS = [
	"#fb7185",
	"#fbbf24",
	"#34d399",
	"#38bdf8",
	"#a78bfa",
	"#f472b6",
	"#60a5fa",
];

interface ConfettiExplosionProps {
	particleCount?: number;
	className?: string;
}

export function ConfettiExplosion({
	particleCount = 30,
	className = "absolute inset-0 pointer-events-none overflow-hidden z-20",
}: ConfettiExplosionProps) {
	const [particles] = useState(() =>
		Array.from({ length: particleCount }, (_, i) => ({
			id: i,
			x: (Math.random() - 0.5) * 240,
			y: -(Math.random() * 160 + 40),
			color:
				CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
			size: Math.random() * 9 + 3,
			shape: Math.random() > 0.5 ? ("circle" as const) : ("square" as const),
			delay: Math.random() * 0.25,
		})),
	);

	return (
		<div className={className}>
			{particles.map((p) => (
				<div
					key={p.id}
					className="absolute animate-confetti"
					style={{
						left: "50%",
						top: "45%",
						width: p.size,
						height: p.size,
						backgroundColor: p.color,
						borderRadius: p.shape === "circle" ? "50%" : "2px",
						["--x" as string]: `${p.x}px`,
						["--y" as string]: `${p.y}px`,
						animationDelay: `${p.delay}s`,
					}}
				/>
			))}
		</div>
	);
}
