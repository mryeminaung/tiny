import { Button } from "@/components/ui/button";
import type { Energy, Mood } from "@/lib/challenges";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/use-app-store";
import { Battery, Clock, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const difficultyOptions = [
	{ value: 1, emoji: "🌱", label: "Easy" },
	{ value: 2, emoji: "🔥", label: "Medium" },
	{ value: 3, emoji: "💪", label: "Hard" },
];

const timeOptions = [
	{ value: 10, label: "10 min" },
	{ value: 30, label: "30 min" },
	{ value: 60, label: "1 hour" },
	{ value: null, label: "Any" },
];

const moodOptions: { value: Mood; label: string }[] = [
	{ value: "creative", label: "Creative" },
	{ value: "productive", label: "Productive" },
	{ value: "relaxed", label: "Relaxed" },
	{ value: "social", label: "Social" },
	{ value: "curious", label: "Curious" },
	{ value: "playful", label: "Playful" },
];

const energyOptions: { value: Energy; label: string }[] = [
	{ value: "low", label: "Low energy" },
	{ value: "medium", label: "Medium energy" },
	{ value: "high", label: "High energy" },
];

export function FilterBar() {
	const difficultyFilter = useAppStore((s) => s.difficultyFilter);
	const maxTimeFilter = useAppStore((s) => s.maxTimeFilter);
	const moodFilter = useAppStore((s) => s.moodFilter);
	const energyFilter = useAppStore((s) => s.energyFilter);
	const setDifficultyFilter = useAppStore((s) => s.setDifficultyFilter);
	const setMaxTimeFilter = useAppStore((s) => s.setMaxTimeFilter);
	const setMoodFilter = useAppStore((s) => s.setMoodFilter);
	const setEnergyFilter = useAppStore((s) => s.setEnergyFilter);

	const handleDifficulty = (val: number) => {
		// Toggle: click same = deselect, click different = select
		setDifficultyFilter(difficultyFilter === val ? null : val);
	};

	const hasFilters = difficultyFilter !== null || maxTimeFilter !== null || moodFilter !== null || energyFilter !== null;

	return (
		<motion.div
			className="space-y-3 mt-10"
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
			<div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
				<SlidersHorizontal className="size-6 text-black" />
				<h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
					Filter challenges
				</h1>
				{hasFilters && (
					<button
						onClick={() => {
							setDifficultyFilter(null);
							setMaxTimeFilter(null);
							setMoodFilter(null);
							setEnergyFilter(null);
						}}
							className="text-primary hover:underline cursor-pointer ml-1"
							aria-label="Clear all challenge filters">
						Clear
					</button>
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{moodOptions.map((opt) => (
					<Button key={opt.value} size="sm" variant={moodFilter === opt.value ? "default" : "secondary"} aria-pressed={moodFilter === opt.value} onClick={() => setMoodFilter(moodFilter === opt.value ? null : opt.value)} className="gap-1.5 transition-all duration-200 hover:cursor-pointer">
						<Sparkles className="size-3" />{opt.label}
					</Button>
				))}
			</div>
			<div className="flex flex-wrap gap-2">
				{energyOptions.map((opt) => (
					<Button key={opt.value} size="sm" variant={energyFilter === opt.value ? "default" : "secondary"} aria-pressed={energyFilter === opt.value} onClick={() => setEnergyFilter(energyFilter === opt.value ? null : opt.value)} className="gap-1.5 transition-all duration-200 hover:cursor-pointer">
						<Battery className="size-3" />{opt.label}
					</Button>
				))}
			</div>
			<div className="flex flex-wrap gap-2">
				{difficultyOptions.map((opt) => {
					const isActive = difficultyFilter === opt.value;
					return (
						<Button
							key={opt.value}
							size="sm"
							variant={isActive ? "default" : "secondary"}
							aria-pressed={isActive}
							onClick={() => handleDifficulty(opt.value)}
							className={cn(
								"gap-1.5 transition-all duration-200 hover:cursor-pointer",
							)}>
							<span>{opt.emoji}</span>
							{opt.label}
						</Button>
					);
				})}

				<div className="w-px bg-border mx-1" />

				{timeOptions.map((opt) => {
					const isActive = maxTimeFilter === opt.value;
					return (
						<Button
							key={opt.label}
							size="sm"
							variant={isActive ? "default" : "secondary"}
							aria-pressed={isActive}
							onClick={() => setMaxTimeFilter(opt.value)}
							className={cn(
								"gap-1.5 transition-all duration-200 hover:cursor-pointer",
							)}>
							<Clock className="size-3" />
							{opt.label}
						</Button>
					);
				})}
			</div>
		</motion.div>
	);
}
