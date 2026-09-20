import { categories, type Category } from "@/lib/challenges";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { motion } from "motion/react";

const categoryColors: Record<string, { ring: string; icon: string }> = {
	create: { ring: "ring-rose-400/50", icon: "text-rose-500" },
	code: { ring: "ring-sky-400/50", icon: "text-sky-500" },
	think: { ring: "ring-violet-400/50", icon: "text-violet-500" },
	friends: { ring: "ring-amber-400/50", icon: "text-amber-500" },
	eat: { ring: "ring-emerald-400/50", icon: "text-emerald-500" },
	play: { ring: "ring-blue-400/50", icon: "text-blue-500" },
	outside: { ring: "ring-lime-400/50", icon: "text-lime-600" },
	random: { ring: "ring-primary/50", icon: "text-primary" },
};

export function CategoryGrid() {
	const currentCategory = useAppStore((s) => s.currentCategory);
	const setCategory = useAppStore((s) => s.setCategory);

	return (
		<div className="space-y-5">
			<div className="text-center space-y-1.5">
				<h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
					What are you in the mood for?
				</h2>
				<p className="text-xs text-muted-foreground">
					Pick a vibe and let's go
				</p>
			</div>

			<div className="grid grid-cols-4 gap-2.5 sm:gap-3">
				{categories.map((cat, i) => {
					const isActive = currentCategory === cat.id;
					const colors = categoryColors[cat.id];
					const Icon = cat.icon;

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
								"group relative flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-full transition-all duration-200 cursor-pointer",
								"border bg-card",
								"hover:scale-[1.05] active:scale-[0.95]",
								isActive
									? cn("border-border shadow-md", "ring-2", colors.ring)
									: cn("border-border", "hover:bg-muted hover:border-border"),
							)}>
							<Icon
								className={cn(
									"size-6 sm:size-7 transition-all duration-200",
									colors.icon,
									!isActive && "group-hover:scale-110 group-hover:rotate-6",
								)}
								strokeWidth={1.8}
							/>
							<div className="text-center">
								<span
									className={cn(
										"text-[11px] sm:text-xs font-bold block leading-tight",
										isActive ? "text-foreground" : "text-foreground/80",
									)}>
									{cat.label}
								</span>
							</div>
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
