import { Button } from "@/components/ui/button";
import { categories, type Category } from "@/lib/challenges";
import { categoryColor, categoryEmoji } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "@/lib/utils";
import { Check, Clock, Filter, MessageSquare, Sparkles, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";

const funTimeMessages = [
	"just now — speedrun 🏃",
	"a moment ago ⚡",
	"a few mins ago",
	"some time ago",
	"a while back",
	"ages ago (not really)",
];

function timeAgo(iso: string): string {
	const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
	if (seconds < 60) return funTimeMessages[0];
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60)
		return minutes <= 5 ? funTimeMessages[1] : `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return days === 1 ? "yesterday" : `${days}d ago`;
}

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
					<span className="text-4xl">😴</span>
				</div>
				<motion.div
					className="absolute -top-2 -right-2 size-6 rounded-full bg-amber-100 flex items-center justify-center"
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
					<span className="text-xs">💤</span>
				</motion.div>
				<motion.div
					className="absolute -bottom-1 -left-3 size-5 rounded-full bg-violet-100 flex items-center justify-center"
					animate={{ y: [0, -7, 0] }}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 0.7,
					}}>
					<span className="text-xs">💤</span>
				</motion.div>
			</div>

			<h3 className="text-xl font-bold text-foreground mb-1">Crickets. 🦗</h3>
			<p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
				You haven't completed any challenges yet. Go do something!
			</p>

			<Link
				to="/challenges"
				className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 shadow-lg">
				<Sparkles className="size-4" />
				Let's go
			</Link>
		</motion.div>
	);
}

function NoteEditor({
	challengeId,
	existingNote,
	onSave,
}: {
	challengeId: string;
	existingNote?: string;
	onSave: (note: string) => void;
}) {
	const [note, setNote] = useState(existingNote || "");

	return (
		<div className="mt-2 flex items-start gap-2">
			<textarea
				value={note}
				onChange={(e) => setNote(e.target.value)}
				placeholder="Add a note about this challenge..."
				className="flex-1 text-xs bg-muted/50 border border-border rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60"
				rows={2}
				autoFocus
			/>
			<div className="flex flex-col gap-1">
				<button
					onClick={() => onSave(note)}
					className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors cursor-pointer"
					title="Save note">
					<Check className="size-3" strokeWidth={3} />
				</button>
				<button
					onClick={() => onSave(existingNote || "")}
					className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
					title="Cancel">
					<X className="size-3" />
				</button>
			</div>
		</div>
	);
}

export function HistoryView() {
	const history = useAppStore((s) => s.history);
	const toggleComplete = useAppStore((s) => s.toggleComplete);
	const addNote = useAppStore((s) => s.addNote);
	const clearHistory = useAppStore((s) => s.clearHistory);
	const [filter, setFilter] = useState<Category | "all">("all");
	const [editingNote, setEditingNote] = useState<string | null>(null);

	if (history.length === 0) {
		return <EmptyState />;
	}

	const completedCount = history.filter((h) => h.isCompleted).length;
	const filteredHistory =
		filter === "all"
			? history
			: history.filter((h) => h.challenge.category === filter);
	const usedCategories = Array.from(
		new Set(history.map((h) => h.challenge.category)),
	);

	return (
		<div className="space-y-8">
			<motion.div
				className="space-y-1"
				{...fadeUp(0)}>
				<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
					Your Tiny Journey 🗺️
				</h1>
				<p className="text-muted-foreground text-sm">
					{completedCount === 0
						? "No challenges completed yet — let's change that!"
						: completedCount === 1
							? "1 challenge down. Many more to go 🚀"
							: `${completedCount} challenges done — you're on fire 🔥`}
				</p>
			</motion.div>

			{/* Stats */}
			<motion.div
				className="grid grid-cols-3 gap-3"
				{...fadeUp(0.05)}>
				<div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
					<p className="text-2xl font-bold text-foreground">{completedCount}</p>
					<p className="text-xs text-muted-foreground font-medium mt-0.5">
						Done ✓
					</p>
				</div>
				<div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
					<p className="text-2xl font-bold text-foreground">{history.length}</p>
					<p className="text-xs text-muted-foreground font-medium mt-0.5">
						Attempted
					</p>
				</div>
				<div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
					<p className="text-2xl font-bold text-foreground">
						{usedCategories.length}
					</p>
					<p className="text-xs text-muted-foreground font-medium mt-0.5">
						Vibes tried
					</p>
				</div>
			</motion.div>

			{/* Filters */}
			<motion.div
				className="space-y-3"
				{...fadeUp(0.1)}>
				<div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
					<Filter className="size-3.5" />
					Filter by vibe
				</div>
				<div className="flex flex-wrap gap-2">
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
				</div>
			</motion.div>

			{/* History List */}
			<div className="space-y-2.5">
				{filteredHistory.map((entry, i) => {
					const cat = categories.find((c) => c.id === entry.challenge.category);
					const isEditing = editingNote === entry.challenge.id;
					return (
						<motion.div
							key={`${entry.challenge.id}-${entry.completedAt}`}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.15 + i * 0.04,
								ease: [0.16, 1, 0.3, 1],
							}}
							className={cn(
								"group p-4 bg-card rounded-2xl border border-border",
								"shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
								"hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
								"transition-all duration-200 hover:-translate-y-0.5",
							)}>
							<div className="flex items-center gap-4">
								<button
									onClick={() => toggleComplete(entry.challenge.id)}
									className="shrink-0 cursor-pointer rounded-full">
									{entry.isCompleted ? (
										<div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
											<Check
												className="size-4 text-white"
												strokeWidth={3}
											/>
										</div>
									) : (
										<div className="size-8 rounded-full border-2 border-dashed border-border hover:border-primary transition-colors" />
									)}
								</button>

								<div className="flex-1 min-w-0">
									<p
										className={cn(
											"text-sm font-semibold truncate",
											entry.isCompleted
												? "text-muted-foreground line-through decoration-muted-foreground/30"
												: "text-foreground",
										)}>
										{entry.challenge.title}
									</p>
									<div className="flex items-center gap-2 mt-0.5">
										<span
											className={cn(
												"text-xs font-medium",
												categoryColor[entry.challenge.category],
											)}>
											{categoryEmoji[entry.challenge.category]} {cat?.label}
										</span>
										<span className="text-border">·</span>
										<span className="text-xs text-muted-foreground flex items-center gap-1">
											<Clock className="size-3" />
											{entry.challenge.timeEstimate}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1.5 shrink-0">
									<button
										onClick={() => setEditingNote(isEditing ? null : entry.challenge.id)}
										className={cn(
											"p-1.5 rounded-lg transition-colors cursor-pointer",
											entry.note
												? "text-primary hover:bg-primary/10"
												: "text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100",
										)}
										title={entry.note ? "Edit note" : "Add note"}>
										<MessageSquare className="size-3.5" />
									</button>
									<span className="text-[11px] text-muted-foreground tabular-nums font-medium">
										{timeAgo(entry.completedAt)}
									</span>
								</div>
							</div>

							{/* Note display */}
							{entry.note && !isEditing && (
								<div className="mt-2 ml-12 pl-3 border-l-2 border-primary/20">
									<p className="text-xs text-muted-foreground italic leading-relaxed">
										"{entry.note}"
									</p>
								</div>
							)}

							{/* Note editor */}
							<AnimatePresence>
								{isEditing && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="ml-12 overflow-hidden">
										<NoteEditor
											challengeId={entry.challenge.id}
											existingNote={entry.note}
											onSave={(note) => {
												addNote(entry.challenge.id, note);
												setEditingNote(null);
											}}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					);
				})}
			</div>

			{/* Clear History */}
			<motion.div
				className="flex justify-end pt-2"
				{...fadeUp(0.2)}>
				<Button
					variant="destructive"
					size="sm"
					onClick={clearHistory}>
					<Trash2 className="size-3.5" />
					Start over
				</Button>
			</motion.div>
		</div>
	);
}
