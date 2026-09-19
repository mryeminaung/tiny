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
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:pt-16 space-y-16 sm:space-y-20">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-[var(--foreground)]">Categories</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Pick one, or just roll the dice.
          </p>
        </div>
        <CategoryGrid />
      </section>

      {/* Challenge area */}
      <section className="space-y-5">
        {currentChallenge ? (
          <ChallengeCard />
        ) : (
          <div className="border-2 border-dashed border-[var(--border)] rounded-3xl py-16 px-6 text-center animate-fade-in">
            <span className="text-4xl block mb-3 animate-float">👆</span>
            <p className="text-[var(--muted-foreground)] text-base font-medium">
              Pick a category above to get a challenge
            </p>
          </div>
        )}

        {/* Quick generate button (when no category selected) */}
        {!currentChallenge && (
          <button
            onClick={handleSurprise}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-lg shadow-[var(--foreground)]/10"
          >
            <Sparkles className="size-4" />
            Surprise me
          </button>
        )}

        {/* Generate another when challenge exists */}
        {currentChallenge && (
          <button
            onClick={generateChallenge}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-2xl border-2 border-[var(--border)] text-[var(--muted-foreground)] font-medium text-sm hover:bg-[var(--secondary)] hover:border-[var(--foreground)]/20 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="size-4" />
            Give me something else
          </button>
        )}
      </section>
    </main>
  );
}
