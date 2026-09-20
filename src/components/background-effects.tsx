const ORBS = [
	{ color: "#a78bfa", size: "w-40 h-40", top: "5%", left: "10%" },
	{ color: "#fb7185", size: "w-32 h-32", top: "20%", left: "75%" },
	{ color: "#38bdf8", size: "w-36 h-36", top: "50%", left: "5%" },
	{ color: "#fbbf24", size: "w-28 h-28", top: "70%", left: "80%" },
	{ color: "#34d399", size: "w-24 h-24", top: "85%", left: "30%" },
	{ color: "#f472b6", size: "w-30 h-30", top: "35%", left: "55%" },
	{ color: "#60a5fa", size: "w-26 h-26", top: "60%", left: "65%" },
];

function Orb({ color, size, top, left }: { color: string; size: string; top: string; left: string }) {
	return (
		<div
			className={`absolute rounded-full blur-3xl opacity-25 ${size}`}
			style={{ background: color, top, left }}
		/>
	);
}

export function BackgroundEffects() {
	return (
		<div
			className="fixed inset-0 pointer-events-none overflow-hidden z-0"
			style={{
				background:
					"linear-gradient(135deg, #FAF8F5 0%, #EDE9FE 25%, #FCE7F3 50%, #E0F2FE 75%, #FAF8F5 100%)",
			}}
			aria-hidden="true">
			{ORBS.map((orb, i) => (
				<Orb key={i} {...orb} />
			))}
		</div>
	);
}
