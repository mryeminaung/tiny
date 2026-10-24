import { BackgroundEffects } from "@/components/background-effects";
import { Dices, Flame, Gamepad2, Timer, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Link, Outlet } from "react-router";

const stats = [
	{ icon: Gamepad2, value: "56", label: "Challenges", color: "text-sky-500" },
	{ icon: Trophy, value: "7", label: "Vibes", color: "text-violet-500" },
	{ icon: Timer, value: "5–60", label: "Min each", color: "text-emerald-500" },
	{ icon: Flame, value: "0$", label: "Cost", color: "text-orange-500" },
];

export function AuthLayout() {
	return (
		<div className="relative min-h-dvh w-full overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
			<BackgroundEffects />

			<div className="relative z-10 mx-auto grid min-h-[calc(100dvh-2rem)] max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-background/30 shadow-2xl shadow-violet-900/10 backdrop-blur-sm sm:min-h-[calc(100dvh-4rem)] lg:grid-cols-[0.9fr_1.1fr]">
				<section className="hidden flex-col justify-between bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-10 lg:flex">
					<div>
						<Link to="/" className="inline-flex items-center">
							<img src="/logo.png" alt="Tiny" className="h-20 w-auto" />
						</Link>
					</div>

					<div className="space-y-8">
						<div className="space-y-3">
							<div className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
								<Dices className="size-3.5" />
								A little nudge to start
							</div>
							<h1 className="max-w-sm font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground">
								Make room for a tiny adventure.
							</h1>
							<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
								Pick a vibe, get a challenge, and make a few minutes feel more interesting.
							</p>
						</div>

						<div className="grid max-w-sm grid-cols-2 gap-3">
							{stats.map((stat, i) => (
								<motion.div
									key={stat.label}
									className="rounded-2xl border border-white/60 bg-white/35 p-3 shadow-sm backdrop-blur-sm"
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}>
									<stat.icon className={`mb-2 size-5 ${stat.color}`} />
									<p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
									<p className="text-[10px] font-medium text-muted-foreground">{stat.label}</p>
								</motion.div>
							))}
						</div>
					</div>

					<p className="text-xs font-medium text-muted-foreground">No pressure. Just vibes.</p>
				</section>

				<section className="flex items-center justify-center p-5 sm:p-10">
					<div className="w-full max-w-md space-y-6">
						<div className="flex items-center justify-between lg:hidden">
							<Link to="/" aria-label="Tiny home">
								<img src="/logo.png" alt="Tiny" className="h-14 w-auto" />
							</Link>
							<Link to="/" className="text-xs font-semibold text-muted-foreground hover:text-foreground">
								Back home
						</Link>
						</div>

						<div className="glass rounded-[1.75rem] border border-white/70 p-6 shadow-xl shadow-violet-900/10 sm:p-8">
							<Outlet />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
