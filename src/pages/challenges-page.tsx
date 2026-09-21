import { Button } from "@/components/ui/button";
import { CategoryGrid, ChallengeCard, FilterBar } from "@/features/challenges";
import { useAppStore } from "@/stores/use-app-store";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function ChallengesPage() {
	const currentChallenge = useAppStore((s) => s.currentChallenge);
	const history = useAppStore((s) => s.history);
	const generateForCategory = useAppStore((s) => s.generateForCategory);

	return (
		<section className="py-8 sm:py-14">
			<motion.div
				className="space-y-2 mb-10"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
				<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
					What are you in the mood for?
				</h1>
				<p className="text-xs text-muted-foreground">
					Choose a vibe, set your filters, and let's go{" "}
				</p>
			</motion.div>

			<CategoryGrid />

			<FilterBar />

			{!currentChallenge && (
				<motion.div
					className="flex flex-col items-center gap-4 mt-10"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
					<Button
						onClick={() => generateForCategory("random")}
						size="lg"
						className="px-8 text-base font-bold shadow-lg hover:scale-[1.03] active:scale-[0.97] overflow-hidden hover:cursor-pointer">
						<Sparkles className="size-5" />
						Surprise me
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
					</Button>
					{history.length > 0 && (
						<p className="text-xs text-muted-foreground">
							{history.length} challenge{history.length !== 1 ? "s" : ""}{" "}
							completed ✨
						</p>
					)}
				</motion.div>
			)}

			{currentChallenge && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}>
					<ChallengeCard />
				</motion.div>
			)}
		</section>
	);
}
