import { categories, type Category } from "@/lib/challenges";
import { useStore } from "@/lib/store";
import { cn } from "cn";

const categoryMeta: Record<
  string,
  {
    emoji: string;
    description: string;
    lightBg: string;
    lightHover: string;
    activeBg: string;
  }
> = {
  create: {
    emoji: "🎨",
    description: "Get crafty",
    lightBg: "bg-rose-50 dark:bg-rose-950/40",
    lightHover: "hover:bg-rose-100 dark:hover:bg-rose-900/50",
    activeBg: "bg-rose-500 dark:bg-rose-500",
  },
  code: {
    emoji: "💻",
    description: "Hack stuff",
    lightBg: "bg-sky-50 dark:bg-sky-950/40",
    lightHover: "hover:bg-sky-100 dark:hover:bg-sky-900/50",
    activeBg: "bg-sky-500 dark:bg-sky-500",
  },
  think: {
    emoji: "🧠",
    description: "Brain time",
    lightBg: "bg-violet-50 dark:bg-violet-950/40",
    lightHover: "hover:bg-violet-100 dark:hover:bg-violet-900/50",
    activeBg: "bg-violet-500 dark:bg-violet-500",
  },
  friends: {
    emoji: "👥",
    description: "Bug someone",
    lightBg: "bg-amber-50 dark:bg-amber-950/40",
    lightHover: "hover:bg-amber-100 dark:hover:bg-amber-900/50",
    activeBg: "bg-amber-500 dark:bg-amber-500",
  },
  eat: {
    emoji: "🍕",
    description: "Nom nom",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/40",
    lightHover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
    activeBg: "bg-emerald-500 dark:bg-emerald-500",
  },
  play: {
    emoji: "🎮",
    description: "Game on",
    lightBg: "bg-blue-50 dark:bg-blue-950/40",
    lightHover: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
    activeBg: "bg-blue-500 dark:bg-blue-500",
  },
  outside: {
    emoji: "🌿",
    description: "Touch grass",
    lightBg: "bg-lime-50 dark:bg-lime-950/40",
    lightHover: "hover:bg-lime-100 dark:hover:bg-lime-900/50",
    activeBg: "bg-lime-600 dark:bg-lime-600",
  },
  random: {
    emoji: "🎲",
    description: "Yolo mode",
    lightBg: "bg-violet-50 dark:bg-violet-950/40",
    lightHover: "hover:bg-violet-100 dark:hover:bg-violet-900/50",
    activeBg: "bg-primary dark:bg-primary",
  },
};

export function CategoryGrid() {
  const currentCategory = useStore((s) => s.currentCategory);
  const setCategory = useStore((s) => s.setCategory);

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3 stagger-children">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.id;
        const meta = categoryMeta[cat.id];

        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id as Category)}
            className={cn(
              "group relative flex flex-col items-start gap-1.5 sm:gap-2 p-3.5 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left",
              "hover:scale-[1.04] hover:-translate-y-1 active:scale-[0.96]",
              isActive
                ? cn(meta.activeBg, "border-transparent text-white shadow-lg")
                : cn(
                    meta.lightBg,
                    meta.lightHover,
                    "border-transparent",
                    "hover:shadow-md"
                  )
            )}
          >
            <span
              className={cn(
                "text-xl sm:text-3xl leading-none transition-transform duration-200",
                !isActive && "group-hover:scale-125 group-hover:rotate-6"
              )}
            >
              {meta.emoji}
            </span>

            <div className="space-y-0">
              <span
                className={cn(
                  "text-xs sm:text-sm font-bold block leading-tight",
                  isActive ? "text-white" : "text-foreground"
                )}
              >
                {cat.label}
              </span>
              <span
                className={cn(
                  "text-[10px] sm:text-xs block leading-tight",
                  isActive ? "text-white/70" : "text-muted-foreground"
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
