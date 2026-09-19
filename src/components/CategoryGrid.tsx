import { categories, type Category } from "@/lib/challenges";
import { useStore } from "@/lib/store";
import { cn } from "cn";

const categoryMeta: Record<
  string,
  {
    emoji: string;
    description: string;
    bg: string;
    hoverBg: string;
    activeBg: string;
    activeBorder: string;
    iconColor: string;
  }
> = {
  create: {
    emoji: "🎨",
    description: "Make something",
    bg: "bg-rose-50",
    hoverBg: "hover:bg-rose-100",
    activeBg: "bg-rose-500",
    activeBorder: "border-rose-500",
    iconColor: "text-rose-500",
  },
  code: {
    emoji: "💻",
    description: "Build & hack",
    bg: "bg-sky-50",
    hoverBg: "hover:bg-sky-100",
    activeBg: "bg-sky-500",
    activeBorder: "border-sky-500",
    iconColor: "text-sky-500",
  },
  think: {
    emoji: "🧠",
    description: "Challenge your mind",
    bg: "bg-violet-50",
    hoverBg: "hover:bg-violet-100",
    activeBg: "bg-violet-500",
    activeBorder: "border-violet-500",
    iconColor: "text-violet-500",
  },
  friends: {
    emoji: "👥",
    description: "Connect with people",
    bg: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    activeBg: "bg-amber-500",
    activeBorder: "border-amber-500",
    iconColor: "text-amber-500",
  },
  eat: {
    emoji: "🍕",
    description: "Cook & taste",
    bg: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-100",
    activeBg: "bg-emerald-500",
    activeBorder: "border-emerald-500",
    iconColor: "text-emerald-500",
  },
  play: {
    emoji: "🎮",
    description: "Have fun",
    bg: "bg-blue-50",
    hoverBg: "hover:bg-blue-100",
    activeBg: "bg-blue-500",
    activeBorder: "border-blue-500",
    iconColor: "text-blue-500",
  },
  outside: {
    emoji: "🌿",
    description: "Explore the world",
    bg: "bg-lime-50",
    hoverBg: "hover:bg-lime-100",
    activeBg: "bg-lime-600",
    activeBorder: "border-lime-600",
    iconColor: "text-lime-600",
  },
};

export function CategoryGrid() {
  const currentCategory = useStore((s) => s.currentCategory);
  const setCategory = useStore((s) => s.setCategory);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.id;
        const meta = categoryMeta[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as Category)}
            className={cn(
              "group relative flex flex-col items-start gap-2 p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left",
              "hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97]",
              isActive
                ? cn(meta.activeBg, "border-transparent text-white shadow-lg")
                : cn(
                    meta.bg,
                    meta.hoverBg,
                    "border-transparent",
                    "hover:shadow-md"
                  )
            )}
          >
            {/* Emoji */}
            <span
              className={cn(
                "text-2xl sm:text-3xl leading-none transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )}
            >
              {meta.emoji}
            </span>

            {/* Label */}
            <div className="space-y-0.5">
              <span
                className={cn(
                  "text-sm font-bold block",
                  isActive ? "text-white" : "text-[var(--foreground)]"
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  "text-xs block",
                  isActive ? "text-white/70" : "text-[var(--muted-foreground)]"
                )}
              >
                {meta.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
