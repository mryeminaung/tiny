import { Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { getRandomChallenge } from "@/lib/challenges";

function SparkleSvg({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} style={style}>
      <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
    </svg>
  );
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <SparkleSvg className="absolute top-6 left-[12%] size-4 text-amber-400 animate-sparkle opacity-50" />
      <SparkleSvg className="absolute top-16 right-[15%] size-2.5 text-primary animate-sparkle-2 opacity-35" />
      <SparkleSvg className="absolute bottom-12 left-[20%] size-3 text-rose-400 animate-sparkle opacity-30" style={{ animationDelay: "1s" }} />
      <SparkleSvg className="absolute top-1/2 right-[8%] size-2 text-violet-400 animate-sparkle-2 opacity-25" style={{ animationDelay: "0.4s" }} />
      <SparkleSvg className="absolute bottom-8 left-[35%] size-2 text-sky-400 animate-sparkle opacity-35" style={{ animationDelay: "0.7s" }} />

      <div className="absolute top-12 right-[12%] size-2.5 rounded-full bg-amber-300/30 animate-float" />
      <div className="absolute bottom-16 left-[8%] size-2 rounded-full bg-primary/15 animate-float-delayed" />
      <div className="absolute top-1/3 left-[6%] size-1.5 rounded-full bg-rose-300/40 animate-float" style={{ animationDelay: "0.6s" }} />
      <div className="absolute top-20 right-[25%] size-1 rounded-full bg-emerald-300/30 animate-float-delayed" />

      <svg
        className="absolute bottom-4 right-[12%] w-10 h-10 text-primary opacity-[0.08] animate-float-delayed"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M8 24c4-8 8 8 12 0s8 8 12 0s4-4 8 4" />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const handleGetSomething = () => {
    const challenge = getRandomChallenge();
    useStore.setState({ currentChallenge: challenge });
    setTimeout(() => {
      document.querySelector("[data-challenge-area]")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="relative py-6 sm:py-12 text-center">
      <FloatingElements />

      <div className="relative z-10 space-y-5 max-w-lg mx-auto">
        <h1 className="text-balance">
          <span className="block text-[3rem] sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.88] text-foreground">
            what now?
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
          bored? we gotchu. tap below and we'll give you something fun to do.
        </p>

        <div className="pt-2">
          <button
            onClick={handleGetSomething}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-foreground text-background font-bold text-sm sm:text-base hover:scale-[1.04] active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-xl relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <Sparkles className="size-4 relative z-10" />
            <span className="relative z-10">hit me ✨</span>
          </button>
        </div>
      </div>
    </section>
  );
}
