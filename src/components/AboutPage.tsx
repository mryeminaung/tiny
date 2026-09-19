import { categories } from "@/lib/challenges";

const categoryEmoji: Record<string, string> = {
  create: "🎨",
  code: "💻",
  think: "🧠",
  friends: "👥",
  eat: "🍕",
  play: "🎮",
  outside: "🌿",
};

export function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24 pt-10 sm:pt-16 space-y-12">
      {/* Header */}
      <section className="space-y-4 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
          About Tiny
        </h1>
        <div className="w-12 h-1 rounded-full bg-[var(--primary)]" />
      </section>

      {/* What is Tiny */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "50ms" }}>
        <h2 className="text-lg font-bold text-[var(--foreground)]">What is Tiny?</h2>
        <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
          Tiny gives you small things to do when you don't know what to do.
        </p>
        <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
          We've all been there — staring at a screen, scrolling through nothing, wondering
          what to do next. Tiny is the antidote to that feeling. Instead of doomscrolling,
          you get a quick, fun activity you can start right now.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-lg font-bold text-[var(--foreground)]">How it works</h2>
        <div className="space-y-3">
          {[
            {
              step: "01",
              title: "Pick a category",
              desc: "Choose from 7 categories based on your mood — or let us surprise you.",
            },
            {
              step: "02",
              title: "Get a challenge",
              desc: "Tiny generates a random activity with a difficulty level and time estimate.",
            },
            {
              step: "03",
              title: "Do it",
              desc: "Actually do the thing. It's usually quick, fun, and surprisingly satisfying.",
            },
            {
              step: "04",
              title: "Mark it done",
              desc: "Check it off. Build a streak. See how much you've accomplished.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 p-4 bg-white rounded-2xl border border-[var(--border)] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 size-8 rounded-xl flex items-center justify-center shrink-0">
                {item.step}
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[var(--foreground)]">{item.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Categories</h2>
        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
          Seven vibes to match your mood:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-[var(--border)]"
            >
              <span className="text-lg">{categoryEmoji[cat.id]}</span>
              <span className="text-sm font-semibold text-[var(--foreground)]">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Why Tiny?</h2>
        <blockquote className="border-l-3 border-[var(--primary)] pl-4 py-1">
          <p className="text-sm sm:text-base text-[var(--foreground)] italic leading-relaxed font-medium">
            "The best time to start something is now. The best something is something small."
          </p>
        </blockquote>
        <p className="text-[var(--muted-foreground)] text-sm sm:text-base leading-relaxed">
          Big projects are intimidating. Tiny activities are not. Each challenge is designed
          to take 5 minutes to 1 hour — just enough to break the cycle of boredom without
          feeling like a commitment. But don't be surprised if a "tiny" thing turns into
          something bigger.
        </p>
      </section>

      {/* Footer */}
      <section className="border-t border-[var(--border)] pt-6 animate-fade-in">
        <p className="text-xs text-[var(--muted-foreground)]">
          Made with ✨ and a healthy dose of boredom.
        </p>
      </section>
    </main>
  );
}
