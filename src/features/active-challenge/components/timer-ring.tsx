import { categoryGradients } from "@/lib/constants";

// Extract gradient start/end colors from a gradient string
function extractGradientColors(gradient: string): [string, string] {
	const colorMap: Record<string, [string, string]> = {
		create: ["#fb7185", "#ec4899"],
		code: ["#38bdf8", "#3b82f6"],
		think: ["#a78bfa", "#8b5cf6"],
		friends: ["#fbbf24", "#f97316"],
		eat: ["#34d399", "#22c55e"],
		play: ["#60a5fa", "#6366f1"],
		outside: ["#a3e635", "#10b981"],
	};

	for (const [, colors] of Object.entries(colorMap)) {
		if (gradient.includes(colors[0])) return colors;
	}
	return ["#a78bfa", "#8b5cf6"];
}

interface TimerRingProps {
	progress: number;
	category: string;
}

export function TimerRing({ progress, category }: TimerRingProps) {
	const gradient = categoryGradients[category] || categoryGradients.think;
	const [colorStart, colorEnd] = extractGradientColors(gradient);
	const size = 220;
	const stroke = 8;
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - progress);

	return (
		<svg
			width={size}
			height={size}
			className="drop-shadow-lg w-full max-w-[220px] h-auto"
			viewBox={`0 0 ${size} ${size}`}>
			<defs>
				<linearGradient
					id="timer-gradient"
					x1="0%"
					y1="0%"
					x2="100%"
					y2="100%">
					<stop
						offset="0%"
						stopColor={colorStart}
					/>
					<stop
						offset="100%"
						stopColor={colorEnd}
					/>
				</linearGradient>
			</defs>
			{/* Background track */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke="currentColor"
				strokeWidth={stroke}
				className="text-border opacity-40"
			/>
			{/* Progress arc */}
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke="url(#timer-gradient)"
				strokeWidth={stroke}
				strokeLinecap="round"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
				style={{ transition: "stroke-dashoffset 0.5s ease" }}
			/>
		</svg>
	);
}
