import { ConfettiExplosion } from "@/components/confetti";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/challenges";
import { categoryGradients, difficultyMeta } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { Check, Clock, Rocket, RotateCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ChallengeCard() {
	const currentChallenge = useAppStore((s) => s.currentChallenge);
	const generateChallenge = useAppStore((s) => s.generateChallenge);
	const markComplete = useAppStore((s) => s.markComplete);
	const acceptChallenge = useAppStore((s) => s.acceptChallenge);
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
		acceptChallenge();
		navigate("/active");
	}, [acceptChallenge, navigate]);

	if (!currentChallenge) return null;

	const cat = categories.find((c) => c.id === currentChallenge.category);
	const gradient =
		categoryGradients[currentChallenge.category] || categoryGradients.think;
	const diff = difficultyMeta[currentChallenge.difficulty - 1];

	return (
		<div
			className="relative max-w-xl"
			data-challenge-area>
			<AnimatePresence mode="wait">
				<motion.div
					key={cardKey}
					initial={{ opacity: 0, y: 12, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -8, scale: 0.98 }}
					transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
					{showConfetti && <ConfettiExplosion />}

					{/* Glow */}
					<div
						className="absolute -inset-3 rounded-[2rem] opacity-15 blur-2xl -z-10 transition-all duration-700"
						style={{ background: gradient }}
					/>

					{/* Card */}
					<div className="relative bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
						{/* Top gradient bar */}
						<div
							className="h-1 w-full"
							style={{ background: gradient }}
						/>

						<div className="p-5 sm:p-6 space-y-4">
							{/* Badges row */}
							<div className="flex items-center gap-2 flex-wrap">
								<Badge
									variant="default"
									className="gap-1 font-bold"
									style={{ background: gradient }}>
									{cat?.icon && <cat.icon className="size-3" />}
									{cat?.label}
								</Badge>
								<Badge
									variant="secondary"
									className="gap-1">
									{diff.emoji} {diff.label}
								</Badge>
								<Badge
									variant="secondary"
									className="gap-1">
									<Clock className="size-3" />
									{currentChallenge.timeEstimate}
								</Badge>
							</div>

							{/* Title + Description */}
							<div className="space-y-2">
								<h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug tracking-tight">
									{currentChallenge.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{currentChallenge.description}
								</p>
							</div>

							{/* Action buttons */}
							<div className="flex gap-2.5 pt-1">
								<button
									onClick={handleAnother}
									disabled={isDone}
									className={cn(
										"flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border text-muted-foreground font-semibold text-sm",
										"hover:bg-secondary hover:border-foreground/15 transition-all duration-200 cursor-pointer",
										"hover:scale-[1.02] active:scale-[0.97]",
										"disabled:opacity-40 disabled:cursor-not-allowed",
									)}>
									<RotateCw className="size-4" />
									Skip
								</button>

								<button
									onClick={handleComplete}
									disabled={isDone}
									className={cn(
										"flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white",
										"transition-all duration-200 cursor-pointer",
										"hover:scale-[1.03] active:scale-[0.97]",
										"disabled:opacity-70 disabled:cursor-not-allowed",
										isDone ? "bg-emerald-500" : "shadow-md hover:shadow-lg",
									)}
									style={!isDone ? { background: gradient } : undefined}>
									{isDone ? (
										<>
											<Check className="size-4 animate-check-pop" />
											Nice!
										</>
									) : (
										<>
											<Check className="size-4" />
											Did it!
										</>
									)}
								</button>
							</div>

							{/* Accept Challenge */}
							<button
								onClick={handleAccept}
								disabled={isDone}
								className={cn(
									"w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white",
									"transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg",
									"hover:scale-[1.02] active:scale-[0.97]",
									"disabled:opacity-50 disabled:cursor-not-allowed",
								)}
								style={!isDone ? { background: gradient } : undefined}>
								<Rocket className="size-4" />
								Accept Challenge
							</button>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
