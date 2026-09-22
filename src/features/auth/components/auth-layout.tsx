import { BackgroundEffects } from "@/components/background-effects";
import { Flame, Gamepad2, Timer, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Outlet } from "react-router";

const stats = [
	{ icon: Gamepad2, value: "56", label: "Challenges", color: "text-sky-500" },
	{ icon: Trophy, value: "7", label: "Vibes", color: "text-violet-500" },
	{ icon: Timer, value: "5–60", label: "Min each", color: "text-emerald-500" },
	{ icon: Flame, value: "0$", label: "Cost", color: "text-orange-500" },
];

export function AuthLayout() {
	return (
		<div className="relative min-h-dvh w-full flex">
			<BackgroundEffects />

			{/* Left side — branding */}
			<div className="hidden lg:flex relative z-10 w-[45%] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex-col items-center justify-center p-10 text-center">
				<a href="/" className="inline-block mb-8">
					<img
						src="/logo.png"
						alt="Tiny"
						className="h-24 w-auto"
					/>
				</a>

				<h2 className="text-2xl font-bold text-foreground mb-2">
					Your boredom-fighting companion
				</h2>
				<p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-10">
					56 challenges, 7 vibes, zero friction. Open and start doing.
				</p>

				{/* Stat cards */}
				<div className="grid grid-cols-2 gap-3 w-full max-w-xs">
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							className="p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border text-center space-y-1"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
							<stat.icon className={`size-5 mx-auto ${stat.color}`} />
							<p className="text-lg font-bold text-foreground">{stat.value}</p>
							<p className="text-[10px] text-muted-foreground font-medium">{stat.label}</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* Right side — form */}
			<div className="relative z-10 w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-10">
				<div className="w-full max-w-md space-y-6">
					{/* Mobile logo */}
					<div className="lg:hidden text-center">
						<a href="/" className="inline-block">
							<img
								src="/logo.png"
								alt="Tiny"
								className="h-16 w-auto mx-auto"
							/>
						</a>
					</div>

					<div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
