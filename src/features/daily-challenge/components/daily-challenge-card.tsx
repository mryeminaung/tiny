import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { getDailyChallenge, isDailyCompleted } from "@/lib/daily";
import { categoryGradients, difficultyMeta } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { Calendar, Check, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

export function DailyChallengeCard() {
	const navigate = useNavigate();
	const history = useAppStore((s) => s.history);
	const startChallenge = useAppStore((s) => s.startChallenge);

	const daily = useMemo(() => getDailyChallenge(), []);
	const doneToday = useMemo(() => isDailyCompleted(history), [history]);

	const cat = categories.find((c) => c.id === daily.category);
	const gradient = categoryGradients[daily.category] || categoryGradients.think;
	const diff = difficultyMeta[daily.difficulty - 1];

	const handleStart = useCallback(() => {
		startChallenge(daily);
		navigate(`/challenges/${daily.id}/active`);
	}, [startChallenge, daily, navigate]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
			className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
			{/* Gradient accent bar */}
			<div
				className="h-1 w-full"
				style={{ background: gradient }}
			/>

			<div className="p-5 space-y-3">
				{/* Label */}
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-primary" />
					<span className="text-xs font-semibold text-primary">
						Challenge of the Day
					</span>
				</div>

				{/* Badges */}
				<div className="flex items-center gap-2 flex-wrap">
					<span
						className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
						style={{ background: gradient }}>
						{cat?.icon && <cat.icon className="size-3" />}
						{cat?.label}
					</span>
					<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted border border-border text-foreground/80">
						{diff.emoji} {diff.label}
					</span>
					<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted border border-border text-foreground/80">
						<Clock className="size-3" />
						{daily.timeEstimate}
					</span>
				</div>

				{/* Title + Description */}
				<div className="space-y-1">
					<h3 className="text-base font-bold text-foreground leading-snug">
						{daily.title}
					</h3>
					<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
						{daily.description}
					</p>
				</div>

				{/* Action */}
				{doneToday ? (
					<div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit">
						<Check className="size-4 text-emerald-600" strokeWidth={3} />
						<span className="text-xs font-semibold text-emerald-600">
							Done for today ✨
						</span>
					</div>
				) : (
					<Button
						onClick={handleStart}
						className="gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.97]">
						<Sparkles className="size-4" />
						I'm feeling lucky
					</Button>
				)}
			</div>
		</motion.div>
	);
}
