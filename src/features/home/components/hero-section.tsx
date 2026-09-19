import { getRandomChallenge } from "@/lib/challenges";
import { useAppStore } from "@/stores/use-app-store";
import { Flame, Sparkles, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
	const history = useAppStore((s) => s.history);
	const completedCount = history.filter((h) => h.isCompleted).length;

	const handleGetSomething = () => {
		const challenge = getRandomChallenge();
		useAppStore.setState({ currentChallenge: challenge });
		setTimeout(() => {
			document
				.querySelector("[data-challenge-area]")
				?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	};

	return (
		<section className="relative py-8 sm:py-14">
			<div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
				{/* Floating stat badges */}
				<motion.div
					className="flex items-center justify-center gap-3 flex-wrap"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}>
					<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
						<Zap className="size-3.5 text-amber-500" />
						{completedCount > 0 ? `${completedCount} done` : "ready to go"}
					</div>
					<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
						<Flame className="size-3.5 text-orange-500" />
						56+ challenges
					</div>
					<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
						<Trophy className="size-3.5 text-violet-500" />8 vibes
					</div>
				</motion.div>

				{/* Main headline */}
				<motion.div
					space-y-3
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
					<h1 className="text-balance">
						<span className="block text-[3.5rem] sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.85]">
							<span className="bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
								what now
							</span>
							<span className="text-primary">?</span>
						</span>
					</h1>
				</motion.div>

				{/* Tagline */}
				<motion.p
					className="text-sm sm:text-base text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}>
					bored? we gotchu. tap below and we'll give you something fun to do.
				</motion.p>

				{/* CTA Button */}
				<motion.div
					className="pt-1"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}>
					<button
						onClick={handleGetSomething}
						className="group relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base cursor-pointer transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30">
						<Sparkles className="size-5 relative z-10" />
						<span className="relative z-10">hit me ✨</span>
					</button>
				</motion.div>

				{/* Micro hint */}
				<motion.p
					className="text-[11px] text-muted-foreground/60 font-medium"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}>
					No signup · No tracking · Just vibes
				</motion.p>
			</div>
		</section>
	);
}
