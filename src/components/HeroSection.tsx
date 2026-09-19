import { Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { getRandomChallenge } from "@/lib/challenges";

function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" />
    </svg>
  );
}

function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Sparkle 1 - top right */}
      <Sparkle
        className="absolute top-8 right-[15%] size-3 text-[var(--primary)] animate-sparkle opacity-40"
      />

      {/* Sparkle 2 - top left */}
      <Sparkle
        className="absolute top-16 left-[10%] size-2 text-amber-400 animate-sparkle-2 opacity-30"
      />

      {/* Sparkle 3 - mid right */}
      <Sparkle
        className="absolute top-1/2 right-[8%] size-2.5 text-rose-400 animate-sparkle opacity-25"
        style={{ animationDelay: "1s" }}
      />

      {/* Small circle */}
      <div
        className="absolute bottom-12 left-[12%] size-3 rounded-full bg-sky-300/30 animate-float"
      />

      {/* Tiny dot cluster */}
      <div className="absolute top-24 right-[25%] flex gap-1 animate-sparkle-2 opacity-20">
        <div className="size-1 rounded-full bg-violet-400" />
        <div className="size-1 rounded-full bg-violet-400/50" />
        <div className="size-1 rounded-full bg-violet-400/30" />
      </div>

      {/* Abstract squiggle line */}
      <svg
        className="absolute bottom-16 right-[18%] w-12 h-12 text-[var(--primary)] opacity-[0.12] animate-float-delayed"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M8 24c4-8 8 8 12 0s8 8 12 0s4-4 8 4" />
      </svg>

      {/* Small cross */}
      <div className="absolute top-32 left-[22%] opacity-15 animate-float-delayed">
        <svg className="size-4 text-rose-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2v12M2 8h12" />
        </svg>
      </div>

      {/* Floating dot */}
      <div className="absolute bottom-24 right-[30%] size-1.5 rounded-full bg-amber-400/40 animate-float" />
    </div>
  );
}

export function HeroSection() {
  const setPage = useStore((s) => s.setPage);

  const handleGetSomething = () => {
    const challenge = getRandomChallenge();
    useStore.setState({ currentChallenge: challenge });
    // Scroll to challenge area
    setTimeout(() => {
      document.querySelector("[data-challenge-area]")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section className="relative text-center space-y-6 py-8 sm:py-12">
      <FloatingShapes />

      <div className="relative z-10 space-y-5">
        {/* Main headline */}
        <h1 className="text-balance">
          <span className="block text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.95] text-[var(--foreground)]">
            Something
          </span>
          <span className="block text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.95] text-[var(--foreground)]">
            to do.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-[var(--muted-foreground)] font-medium max-w-xs mx-auto leading-relaxed">
          I'm bored.
          <br />
          Give me something.
        </p>

        {/* CTA */}
        <button
          onClick={handleGetSomething}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm sm:text-base hover:scale-[1.04] active:scale-[0.97] transition-all duration-150 cursor-pointer shadow-xl shadow-[var(--foreground)]/15"
        >
          <Sparkles className="size-4" />
          Give Me Something
        </button>
      </div>
    </section>
  );
}
