import { useState } from "react";
import { Link } from "react-router";
import { useStore } from "@/lib/store";
import { categories, type Category } from "@/lib/challenges";
import { Check, Clock, Trash2, Sparkles, Filter } from "lucide-react";
import { cn } from "cn";

const categoryEmoji: Record<string, string> = {
  create: "🎨", code: "💻", think: "🧠", friends: "👥",
  eat: "🍕", play: "🎮", outside: "🌿", random: "🎲",
};

const categoryColor: Record<string, string> = {
  create: "text-rose-500", code: "text-sky-500", think: "text-violet-500",
  friends: "text-amber-500", eat: "text-emerald-500", play: "text-blue-500",
  outside: "text-lime-600", random: "text-primary",
};

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
  if (minutes < 60) return minutes <= 5 ? funTimeMessages[1] : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="size-20 rounded-3xl bg-secondary flex items-center justify-center rotate-3">
          <span className="text-4xl">😴</span>
        </div>
        <div className="absolute -top-2 -right-2 size-6 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center animate-float">
          <span className="text-xs">💤</span>
        </div>
        <div className="absolute -bottom-1 -left-3 size-5 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center animate-float-delayed">
          <span className="text-xs">💤</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1">
        Crickets. 🦗
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
        You haven't completed any challenges yet. Go do something!
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 shadow-lg"
      >
        <Sparkles className="size-4" />
        Let's go
      </Link>
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
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16">
        <EmptyState />
      </main>
    );
  }

  const completedCount = history.filter((h) => h.isCompleted).length;
  const filteredHistory =
    filter === "all" ? history : history.filter((h) => h.challenge.category === filter);

  const usedCategories = Array.from(
    new Set(history.map((h) => h.challenge.category))
  );

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16 space-y-8">
      {/* Header */}
      <div className="space-y-1 animate-slide-up">
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
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: "50ms" }}>
        <div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <p className="text-2xl font-bold text-foreground">{completedCount}</p>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Done ✓</p>
        </div>
        <div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <p className="text-2xl font-bold text-foreground">{history.length}</p>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Attempted</p>
        </div>
        <div className="text-center p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
          <p className="text-2xl font-bold text-foreground">{usedCategories.length}</p>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Vibes tried</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
          <Filter className="size-3.5" />
          Filter by vibe
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border",
              filter === "all"
                ? "bg-foreground text-background border-transparent"
                : "bg-secondary text-muted-foreground border-transparent hover:bg-border"
            )}
          >
            All ✨
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
                    ? "bg-foreground text-background border-transparent"
                    : "bg-secondary text-muted-foreground border-transparent hover:bg-border"
                )}
              >
                {categoryEmoji[catId]} {cat?.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge list */}
      <div className="space-y-2.5 stagger-children">
        {filteredHistory.map((entry) => {
          const cat = categories.find((c) => c.id === entry.challenge.category);
          return (
            <div
              key={`${entry.challenge.id}-${entry.completedAt}`}
              className={cn(
                "group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border",
                "shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
                "hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
                "transition-all duration-200 hover:-translate-y-0.5"
              )}
            >
              <button
                onClick={() => toggleComplete(entry.challenge.id)}
                className="shrink-0 cursor-pointer"
              >
                {entry.isCompleted ? (
                  <div className="size-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                    <Check className="size-4 text-white" strokeWidth={3} />
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
                      : "text-foreground"
                  )}
                >
                  {entry.challenge.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn("text-xs font-medium", categoryColor[entry.challenge.category])}>
                    {categoryEmoji[entry.challenge.category]} {cat?.label}
                  </span>
                  <span className="text-border">·</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {entry.challenge.timeEstimate}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-muted-foreground shrink-0 tabular-nums font-medium">
                {timeAgo(entry.completedAt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Clear */}
      <div className="flex justify-end pt-2 animate-fade-in">
        <button
          onClick={clearHistory}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors duration-200 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
          Start over
        </button>
      </div>
    </main>
  );
}
