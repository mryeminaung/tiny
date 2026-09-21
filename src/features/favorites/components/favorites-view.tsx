import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { categoryColor, categoryEmoji, difficultyMeta } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/use-app-store";
import { Clock, Rocket, Sparkles, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function EmptyState() {
	return (
		<motion.div
			className="flex flex-col items-center justify-center py-20 px-6 text-center"
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
			<div className="relative mb-6">
				<div className="size-20 rounded-3xl bg-secondary flex items-center justify-center rotate-3">
					<span className="text-4xl">📌</span>
				</div>
				<motion.div
					className="absolute -top-2 -right-2 size-6 rounded-full bg-amber-100 flex items-center justify-center"
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
					<span className="text-xs">✨</span>
				</motion.div>
			</div>

			<h3 className="text-xl font-bold text-foreground mb-1">
				Nothing saved yet
			</h3>
			<p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
				Bookmark challenges you want to do later. They'll show up here!
			</p>

			<Link
				to="/challenges"
				className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 shadow-lg">
				<Sparkles className="size-4" />
				Find challenges
			</Link>
		</motion.div>
	);
}

export function FavoritesView() {
	const favorites = useAppStore((s) => s.favorites);
	const toggleFavorite = useAppStore((s) => s.toggleFavorite);
	const startFavoriteChallenge = useAppStore((s) => s.startFavoriteChallenge);
	const navigate = useNavigate();
	const [filter, setFilter] = useState<string>("all");

	if (favorites.length === 0) {
		return <EmptyState />;
	}

	const usedCategories = Array.from(new Set(favorites.map((f) => f.category)));
	const filteredFavorites =
		filter === "all"
			? favorites
			: favorites.filter((f) => f.category === filter);

	const handleStartChallenge = (fav: (typeof favorites)[0]) => {
		startFavoriteChallenge(fav);
		navigate(`/challenges/${fav.id}/active`);
	};

	return (
		<div className="space-y-8 py-8 sm:py-14 ">
			<motion.div
				className="space-y-1"
				{...fadeUp(0)}>
				<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
					Saved Challenges
				</h1>
				<p className="text-muted-foreground text-sm">
					{favorites.length === 1
						? "1 challenge saved for later"
						: `${favorites.length} challenges saved for later`}
				</p>
			</motion.div>

			{/* Filters */}
			{usedCategories.length > 1 && (
				<motion.div
					className="flex flex-wrap gap-2"
					{...fadeUp(0.05)}>
					<Button
						size="sm"
						variant={filter === "all" ? "default" : "secondary"}
						onClick={() => setFilter("all")}>
						All ✨
					</Button>
					{usedCategories.map((catId) => {
						const cat = categories.find((c) => c.id === catId);
						return (
							<Button
								key={catId}
								size="sm"
								variant={filter === catId ? "default" : "secondary"}
								onClick={() => setFilter(catId)}>
								{categoryEmoji[catId]} {cat?.label}
							</Button>
						);
					})}
				</motion.div>
			)}

			{/* Favorites Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{filteredFavorites.map((fav, i) => {
					const cat = categories.find((c) => c.id === fav.category);
					const diff = difficultyMeta[fav.difficulty - 1];
					return (
						<motion.div
							key={fav.id}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.1 + i * 0.04,
								ease: [0.16, 1, 0.3, 1],
							}}
							className={cn(
								"p-4 bg-card rounded-2xl border border-border",
								"shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
								"hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
								"transition-all duration-200 hover:-translate-y-0.5",
								"flex flex-col gap-3",
							)}>
							{/* Header: category + remove */}
							<div className="flex items-center justify-between">
								<span
									className={cn(
										"text-xs font-medium",
										categoryColor[fav.category],
									)}>
									{categoryEmoji[fav.category]} {cat?.label}
								</span>
								<button
									onClick={() => toggleFavorite(fav)}
									className="p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
									title="Remove from favorites">
									<Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
								</button>
							</div>

							{/* Title + Description */}
							<div className="space-y-1">
								<h3 className="text-sm font-bold text-foreground leading-snug">
									{fav.title}
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
									{fav.description}
								</p>
							</div>

							{/* Meta + Action */}
							<div className="flex items-center justify-between mt-auto pt-1">
								<div className="flex items-center gap-2">
									<span className="text-xs text-muted-foreground">
										{diff.emoji} {diff.label}
									</span>
									<span className="text-border">·</span>
									<span className="text-xs text-muted-foreground flex items-center gap-1">
										<Clock className="size-3" />
										{fav.timeEstimate}
									</span>
								</div>
								<Button
									size="sm"
									variant="default"
									onClick={() => handleStartChallenge(fav)}
									className="gap-1.5">
									<Rocket className="size-3" />
									Go
								</Button>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
