import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { getRandomChallenge } from "@/lib/challenges";

export function HomePage() {
  const currentChallenge = useStore((s) => s.currentChallenge);
  const generateChallenge = useStore((s) => s.generateChallenge);

  const handleSurprise = () => {
    const challenge = getRandomChallenge();
    useStore.setState({ currentChallenge: challenge });
  };

  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-6 sm:pt-10 space-y-14 sm:space-y-18">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-foreground">
            What are you in the mood for? 🤔
          </h2>
          <p className="text-sm text-muted-foreground">
            Pick a vibe, any vibe.
          </p>
        </div>
        <CategoryGrid />
      </section>

      {/* Challenge area */}
      <section className="space-y-5">
        {currentChallenge ? (
          <ChallengeCard />
        ) : (
          <div className="border-2 border-dashed border-border/60 rounded-3xl py-14 px-6 text-center animate-fade-in space-y-3">
            <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-secondary mb-1">
              <span className="text-3xl animate-float">👆</span>
            </div>
            <p className="text-foreground text-base font-bold">
              awaiting your command
            </p>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Tap a category above or let us surprise you. No pressure.
            </p>
          </div>
        )}

        {/* Surprise button (no challenge yet) */}
        {!currentChallenge && (
          <button
            onClick={handleSurprise}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-lg"
          >
            <Sparkles className="size-4" />
            Surprise me 🎲
          </button>
        )}

        {/* Generate another */}
        {currentChallenge && (
          <button
            onClick={generateChallenge}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-2xl border-2 border-border text-muted-foreground font-medium text-sm hover:bg-secondary hover:border-foreground/20 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="size-4" />
            Something else
          </button>
        )}
      </section>

      {/* Fun footer note */}
      <div className="text-center pb-4">
        <p className="text-xs text-muted-foreground/60">
          no login needed · no data collected · just vibes
        </p>
      </div>
    </main>
  );
}
