import { categories, type Category } from "@/lib/challenges";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { motion } from "motion/react";

const categoryMeta: Record<
	string,
	{
		emoji: string;
		label: string;
		description: string;
		bg: string;
		hoverBg: string;
		activeBg: string;
		activeText: string;
	}
> = {
	create: {
		emoji: "🎨",
		label: "Create",
		description: "Draw, write, design",
		bg: "bg-rose-50 dark:bg-rose-950/30",
		hoverBg: "hover:bg-rose-100 dark:hover:bg-rose-900/40",
		activeBg: "bg-rose-500",
		activeText: "text-white",
	},
	code: {
		emoji: "💻",
		label: "Code",
		description: "Build & ship",
		bg: "bg-sky-50 dark:bg-sky-950/30",
		hoverBg: "hover:bg-sky-100 dark:hover:bg-sky-900/40",
		activeBg: "bg-sky-500",
		activeText: "text-white",
	},
	think: {
		emoji: "🧠",
		label: "Think",
		description: "Brain time",
		bg: "bg-violet-50 dark:bg-violet-950/30",
		hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-900/40",
		activeBg: "bg-violet-500",
		activeText: "text-white",
	},
	friends: {
		emoji: "👥",
		label: "Friends",
		description: "Connect & bond",
		bg: "bg-amber-50 dark:bg-amber-950/30",
		hoverBg: "hover:bg-amber-100 dark:hover:bg-amber-900/40",
		activeBg: "bg-amber-500",
		activeText: "text-white",
	},
	eat: {
		emoji: "🍕",
		label: "Eat",
		description: "Cook & taste",
		bg: "bg-emerald-50 dark:bg-emerald-950/30",
		hoverBg: "hover:bg-emerald-100 dark:hover:bg-emerald-900/40",
		activeBg: "bg-emerald-500",
		activeText: "text-white",
	},
	play: {
		emoji: "🎮",
		label: "Play",
		description: "Game on",
		bg: "bg-blue-50 dark:bg-blue-950/30",
		hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
		activeBg: "bg-blue-500",
		activeText: "text-white",
	},
	outside: {
		emoji: "🌿",
		label: "Outside",
		description: "Touch grass",
		bg: "bg-lime-50 dark:bg-lime-950/30",
		hoverBg: "hover:bg-lime-100 dark:hover:bg-lime-900/40",
		activeBg: "bg-lime-600",
		activeText: "text-white",
	},
	random: {
		emoji: "🎲",
		label: "Random",
		description: "Surprise me",
		bg: "bg-violet-50 dark:bg-violet-950/30",
		hoverBg: "hover:bg-violet-100 dark:hover:bg-violet-900/40",
		activeBg: "bg-primary",
		activeText: "text-primary-foreground",
	},
};

export function CategoryGrid() {
	const currentCategory = useAppStore((s) => s.currentCategory);
	const setCategory = useAppStore((s) => s.setCategory);

	return (
		<div className="space-y-5">
			<div className="text-center space-y-1.5">
				<h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
					what are you in the mood for?
				</h2>
				<p className="text-xs text-muted-foreground">
					pick a vibe and let's go
				</p>
			</div>

			<div className="grid grid-cols-4 gap-2 sm:gap-3">
				{categories.map((cat, i) => {
					const isActive = currentCategory === cat.id;
					const meta = categoryMeta[cat.id];

					return (
						<motion.button
							key={cat.id}
							onClick={() => setCategory(cat.id as Category)}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.35,
								delay: i * 0.03,
								ease: [0.16, 1, 0.3, 1],
							}}
							className={cn(
								"group relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer",
								"hover:scale-[1.05] active:scale-[0.95]",
								isActive
									? cn(
											meta.activeBg,
											meta.activeText,
											"shadow-lg shadow-current/20",
										)
									: cn(meta.bg, meta.hoverBg, "hover:shadow-md"),
							)}>
							<span
								className={cn(
									"text-2xl sm:text-3xl transition-transform duration-200",
									!isActive && "group-hover:scale-110 group-hover:rotate-6",
								)}>
								{meta.emoji}
							</span>
							<div className="text-center">
								<span
									className={cn(
										"text-[11px] sm:text-xs font-bold block leading-tight",
										isActive ? meta.activeText : "text-foreground",
									)}>
									{meta.label}
								</span>
								<span
									className={cn(
										"text-[9px] sm:text-[10px] block leading-tight mt-0.5",
										isActive ? "opacity-80" : "text-muted-foreground",
									)}>
									{meta.description}
								</span>
							</div>
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
