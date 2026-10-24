import { ConfettiExplosion } from "@/components/confetti";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { categoryGradients, difficultyMeta } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { Bookmark, Check, Clock, Rocket, RotateCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ChallengeCard() {
	const currentChallenge = useAppStore((s) => s.currentChallenge);
	const generateChallenge = useAppStore((s) => s.generateChallenge);
	const markComplete = useAppStore((s) => s.markComplete);
	const acceptChallenge = useAppStore((s) => s.acceptChallenge);
	const favorites = useAppStore((s) => s.favorites);
	const toggleFavorite = useAppStore((s) => s.toggleFavorite);
	const navigate = useNavigate();
	const [showConfetti, setShowConfetti] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [cardKey, setCardKey] = useState(0);

	useEffect(() => {
		setIsDone(false);
		setCardKey((k) => k + 1);
	}, [currentChallenge?.id]);

	const handleAnother = useCallback(() => {
		generateChallenge();
	}, [generateChallenge]);

	const handleComplete = useCallback(() => {
		setIsDone(true);
		setShowConfetti(true);
		setTimeout(() => {
			markComplete();
			setShowConfetti(false);
		}, 700);
	}, [markComplete]);

	const handleAccept = useCallback(() => {
		if (!currentChallenge) return;
		acceptChallenge();
		navigate(`/challenges/${currentChallenge.id}/active`);
	}, [acceptChallenge, navigate, currentChallenge?.id]);

	if (!currentChallenge) return null;

	const cat = categories.find((c) => c.id === currentChallenge.category);
	const gradient =
		categoryGradients[currentChallenge.category] || categoryGradients.think;
	const diff = difficultyMeta[currentChallenge.difficulty - 1];
	const isFavorited = favorites.some((f) => f.id === currentChallenge.id);

	return (
		<div
			className="relative w-full"
			data-challenge-area>
			<AnimatePresence mode="wait">
				<motion.div
					key={cardKey}
					initial={{ opacity: 0, y: 12, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -8, scale: 0.98 }}
					transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
					{showConfetti && <ConfettiExplosion />}

					{/* Card */}
					<div className="glass relative overflow-hidden rounded-[2rem] border border-white/70 shadow-xl shadow-violet-900/10">
						<div className="space-y-5 p-5 sm:p-7">
							{/* Badges */}
							<div className="flex items-center gap-2 flex-wrap">
								<span
									className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm"
									style={{ background: gradient }}>
									{cat?.icon && <cat.icon className="size-3" />}
									{cat?.label}
								</span>
								<span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/45 px-2.5 py-1 text-xs font-medium text-foreground/75">
									{diff.emoji} {diff.label}
								</span>
								<span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/45 px-2.5 py-1 text-xs font-medium text-foreground/75">
									<Clock className="size-3" />
									{currentChallenge.timeEstimate}
								</span>
								<div className="flex-1" />
								<button
									onClick={() => toggleFavorite(currentChallenge)}
									aria-label={isFavorited ? "Remove challenge from favorites" : "Save challenge to favorites"}
									aria-pressed={isFavorited}
									className="p-1.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
									title={isFavorited ? "Remove from favorites" : "Save for later"}>
									<Bookmark
										className={`size-4 transition-colors ${isFavorited ? "fill-primary text-primary" : "text-muted-foreground"}`}
									/>
								</button>
							</div>

							{/* Title + Description */}
							<div className="max-w-3xl space-y-2">
								<h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug tracking-tight">
									{currentChallenge.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{currentChallenge.description}
								</p>
							</div>

							{/* Action buttons */}
							<div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-3">
								<Button
									variant="outline"
									size="default"
									onClick={handleAnother}
									disabled={isDone}
								className="hover:scale-[1.02] active:scale-[0.97]">
									<RotateCw className="size-4" />
									Skip
								</Button>

								<Button
									variant="default"
									size="default"
									onClick={handleComplete}
									disabled={isDone}
								className="hover:scale-[1.03] active:scale-[0.97]">
									<Check className="size-4" />
									{isDone ? "Nice!" : "Did it!"}
								</Button>
							</div>

							{/* Accept Challenge */}
							<Button
								variant="default"
									size="default"
								onClick={handleAccept}
								disabled={isDone}
								className="col-span-2 hover:scale-[1.02] active:scale-[0.97] sm:col-span-1">
								<Rocket className="size-4" />
								Accept Challenge
							</Button>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
