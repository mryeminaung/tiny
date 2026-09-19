import { useStore } from "@/lib/store";
import { categories } from "@/lib/challenges";
import { Star, Clock, RotateCw, Check } from "lucide-react";
import { cn } from "cn";
import { useState, useCallback, useEffect } from "react";

const categoryStyles: Record<string, { gradient: string; badgeBg: string }> = {
  create:   { gradient: "linear-gradient(135deg, #fb7185, #ec4899)", badgeBg: "bg-rose-500" },
  code:     { gradient: "linear-gradient(135deg, #38bdf8, #3b82f6)", badgeBg: "bg-sky-500" },
  think:    { gradient: "linear-gradient(135deg, #a78bfa, #8b5cf6)", badgeBg: "bg-violet-500" },
  friends:  { gradient: "linear-gradient(135deg, #fbbf24, #f97316)", badgeBg: "bg-amber-500" },
  eat:      { gradient: "linear-gradient(135deg, #34d399, #22c55e)", badgeBg: "bg-emerald-500" },
  play:     { gradient: "linear-gradient(135deg, #60a5fa, #6366f1)", badgeBg: "bg-blue-500" },
  outside:  { gradient: "linear-gradient(135deg, #a3e635, #10b981)", badgeBg: "bg-lime-600" },
};

const difficultyMeta: { emoji: string; label: string }[] = [
  { emoji: "🌱", label: "Easy peasy" },
  { emoji: "🔥", label: "A bit spicy" },
  { emoji: "💪", label: "Let's gooo" },
];

function DifficultyBadge({ level }: { level: 1 | 2 | 3 }) {
  const meta = difficultyMeta[level - 1];
  return (
    <div className="inline-flex items-center gap-1.5 bg-secondary/80 rounded-full px-3 py-1.5">
      <span className="text-sm">{meta.emoji}</span>
      <span className="text-xs font-semibold text-muted-foreground">{meta.label}</span>
    </div>
  );
}

function ConfettiExplosion() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 200,
      y: -(Math.random() * 140 + 30),
      color: ["#fb7185", "#fbbf24", "#34d399", "#38bdf8", "#a78bfa", "#f472b6", "#60a5fa"][
        Math.floor(Math.random() * 7)
      ],
      size: Math.random() * 8 + 3,
      shape: Math.random() > 0.5 ? "circle" : "square",
      delay: Math.random() * 200,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: "50%",
            top: "45%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            ["--x" as string]: `${p.x}px`,
            ["--y" as string]: `${p.y}px`,
            animationDelay: `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function ChallengeCard() {
  const currentChallenge = useStore((s) => s.currentChallenge);
  const generateChallenge = useStore((s) => s.generateChallenge);
  const markComplete = useStore((s) => s.markComplete);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    setIsDone(false);
    setIsExiting(false);
    setCardKey((k) => k + 1);
  }, [currentChallenge?.id]);

  const handleAnother = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => generateChallenge(), 250);
  }, [generateChallenge]);

  const handleComplete = useCallback(() => {
    setIsDone(true);
    setShowConfetti(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        markComplete();
        setShowConfetti(false);
      }, 250);
    }, 600);
  }, [markComplete]);

  if (!currentChallenge) return null;

  const cat = categories.find((c) => c.id === currentChallenge.category);
  const style = categoryStyles[currentChallenge.category];

  return (
    <div
      key={cardKey}
      className={cn(
        "relative max-w-xl",
        isExiting ? "animate-card-exit" : "animate-card-enter"
      )}
      data-challenge-area
    >
      {showConfetti && <ConfettiExplosion />}

      {/* Glow */}
      <div
        className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl -z-10 transition-all duration-700"
        style={{ background: style.gradient }}
      />

      {/* Card */}
      <div className="relative bg-card rounded-[1.75rem] border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),0_12px_32px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 w-full" style={{ background: style.gradient }} />

        <div className="p-6 sm:p-8 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white",
                style.badgeBg
              )}
            >
              <span className="text-sm leading-none">
                {cat?.icon && <cat.icon className="size-3.5" />}
              </span>
              {cat?.label}
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium bg-muted rounded-full px-3 py-1.5">
              <Clock className="size-3.5" />
              {currentChallenge.timeEstimate}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug tracking-tight">
            {currentChallenge.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
            {currentChallenge.description}
          </p>

          {/* Difficulty */}
          <DifficultyBadge level={currentChallenge.difficulty} />

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleAnother}
              disabled={isDone}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border-2 border-border text-muted-foreground font-semibold text-sm",
                "hover:bg-secondary hover:border-foreground/15 transition-all duration-200 cursor-pointer",
                "hover:scale-[1.02] active:scale-[0.97]",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              <RotateCw className="size-4" />
              Nah, next one
            </button>

            <button
              onClick={handleComplete}
              disabled={isDone}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-sm text-white",
                "transition-all duration-200 cursor-pointer",
                "hover:scale-[1.03] active:scale-[0.97]",
                "disabled:opacity-70 disabled:cursor-not-allowed",
                isDone ? "bg-emerald-500" : "shadow-lg hover:shadow-xl"
              )}
              style={!isDone ? { background: style.gradient } : undefined}
            >
              {isDone ? (
                <>
                  <Check className="size-4 animate-check-pop" />
                  Nice! 🎉
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Did it!
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
