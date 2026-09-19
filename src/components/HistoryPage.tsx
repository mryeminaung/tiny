import { useState } from "react";
import { useStore } from "@/lib/store";
import { categories, type Category } from "@/lib/challenges";
import { Check, Clock, Trash2, Sparkles, Filter } from "lucide-react";
import { cn } from "cn";

const categoryEmoji: Record<string, string> = {
  create: "🎨",
  code: "💻",
  think: "🧠",
  friends: "👥",
  eat: "🍕",
  play: "🎮",
  outside: "🌿",
};

const categoryColor: Record<string, string> = {
  create: "text-rose-500",
  code: "text-sky-500",
  think: "text-violet-500",
  friends: "text-amber-500",
  eat: "text-emerald-500",
  play: "text-blue-500",
  outside: "text-lime-600",
};

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function EmptyState() {
  const setPage = useStore((s) => s.setPage);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
      {/* Abstract illustration */}
      <div className="relative mb-8">
        <div className="size-20 rounded-3xl bg-[var(--secondary)] flex items-center justify-center">
          <span className="text-4xl">✨</span>
        </div>
        <div className="absolute -top-2 -right-2 size-6 rounded-full bg-amber-100 flex items-center justify-center animate-float">
          <span className="text-xs">⭐</span>
        </div>
        <div className="absolute -bottom-1 -left-3 size-5 rounded-full bg-violet-100 flex items-center justify-center animate-float-delayed">
          <span className="text-xs">🎯</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
        Nothing here yet.
      </h3>
      <p className="text-[var(--muted-foreground)] text-sm max-w-xs mb-6 leading-relaxed">
        Your completed Tiny challenges will appear here.
      </p>

      <button
        onClick={() => setPage("home")}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-lg"
      >
        <Sparkles className="size-4" />
        Give Me Something
      </button>
    </div>
  );
}

export function HistoryPage() {
  const history = useStore((s) => s.history);
  const toggleComplete = useStore((s) => s.toggleComplete);
  const clearHistory = useStore((s) => s.clearHistory);
  const [filter, setFilter] = useState<Category | "all">("all");

  if (history.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:pt-16">
        <EmptyState />
      </main>
    );
  }

  const completedCount = history.filter((h) => h.isCompleted).length;
  const filteredHistory =
    filter === "all" ? history : history.filter((h) => h.challenge.category === filter);

  // Get unique categories from history
  const usedCategories = Array.from(
    new Set(history.map((h) => h.challenge.category))
  );

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:pt-16 space-y-8">
      {/* Header */}
      <div className="space-y-1 animate-slide-up">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Your Tiny History
        </h1>
        <p className="text-[var(--muted-foreground)] text-sm">
          {completedCount} challenge{completedCount !== 1 ? "s" : ""} completed
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)] animate-slide-up" style={{ animationDelay: "50ms" }}>
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">{completedCount}</p>
          <p className="text-xs text-[var(--muted-foreground)] font-medium">Done</p>
        </div>
        <div className="w-px h-8 bg-[var(--border)]" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">{history.length}</p>
          <p className="text-xs text-[var(--muted-foreground)] font-medium">Total</p>
        </div>
        <div className="w-px h-8 bg-[var(--border)]" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-[var(--foreground)]">
            {usedCategories.length}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] font-medium">Categories</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] font-medium">
          <Filter className="size-3.5" />
          Filter
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border",
              filter === "all"
                ? "bg-[var(--foreground)] text-[var(--background)] border-transparent"
                : "bg-[var(--secondary)] text-[var(--muted-foreground)] border-transparent hover:bg-[var(--border)]"
            )}
          >
            All
          </button>
          {usedCategories.map((catId) => {
            const cat = categories.find((c) => c.id === catId);
            return (
              <button
                key={catId}
                onClick={() => setFilter(catId)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border",
                  filter === catId
                    ? "bg-[var(--foreground)] text-[var(--background)] border-transparent"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)] border-transparent hover:bg-[var(--border)]"
                )}
              >
                {categoryEmoji[catId]} {cat?.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge list */}
      <div className="space-y-2 stagger-children">
        {filteredHistory.map((entry, idx) => {
          const cat = categories.find((c) => c.id === entry.challenge.category);
          return (
            <div
              key={`${entry.challenge.id}-${entry.completedAt}`}
              className={cn(
                "group flex items-center gap-4 p-4 bg-white rounded-2xl border border-[var(--border)]",
                "shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
                "transition-all duration-200 hover:-translate-y-0.5"
              )}
            >
              {/* Check button */}
              <button
                onClick={() => toggleComplete(entry.challenge.id)}
                className="shrink-0 cursor-pointer"
              >
                {entry.isCompleted ? (
                  <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check className="size-4 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="size-8 rounded-full border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] transition-colors" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-semibold truncate",
                    entry.isCompleted
                      ? "text-[var(--muted-foreground)] line-through decoration-[var(--muted-foreground)]/30"
                      : "text-[var(--foreground)]"
                  )}
                >
                  {entry.challenge.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn("text-xs font-medium", categoryColor[entry.challenge.category])}>
                    {categoryEmoji[entry.challenge.category]} {cat?.label}
                  </span>
                  <span className="text-[var(--border)]">·</span>
                  <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                    <Clock className="size-3" />
                    {entry.challenge.timeEstimate}
                  </span>
                </div>
              </div>

              {/* Time ago */}
              <span className="text-[11px] text-[var(--muted-foreground)] shrink-0 tabular-nums font-medium">
                {timeAgo(entry.completedAt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Clear button */}
      <div className="flex justify-end pt-2 animate-fade-in">
        <button
          onClick={clearHistory}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
          Clear history
        </button>
      </div>
    </main>
  );
}
