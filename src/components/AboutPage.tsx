import { categories } from "@/lib/challenges";

const categoryEmoji: Record<string, string> = {
  create: "🎨", code: "💻", think: "🧠", friends: "👥",
  eat: "🍕", play: "🎮", outside: "🌿", random: "🎲",
};

const categoryVibes: Record<string, string> = {
  create: "for the artists",
  code: "for the nerds",
  think: "for the philosophers",
  friends: "for the social butterflies",
  eat: "for the foodies",
  play: "for the gamers",
  outside: "for the adventurers",
  random: "for the chaotic good",
};

export function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-10 sm:pt-16 space-y-10">
      {/* Header */}
      <section className="space-y-3 animate-slide-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          So... what is this? 🤷
        </h1>
      </section>

      {/* What is Tiny */}
      <section className="space-y-3 animate-slide-up" style={{ animationDelay: "50ms" }}>
        <h2 className="text-lg font-bold text-foreground">The deal</h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          You know that feeling when you're bored but nothing <em>specific</em> sounds fun?
          Tiny solves that. We give you a random little challenge — something you can actually
          do <em>right now</em> — and you do it. That's it. That's the whole app.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <h2 className="text-lg font-bold text-foreground">How it works (it's easy)</h2>
        <div className="space-y-3">
          {[
            {
              step: "1️⃣",
              title: "Pick a vibe",
              desc: "Choose a category that matches your mood. Feeling creative? Hungry? Lazy? We got you.",
            },
            {
              step: "2️⃣",
              title: "Get a challenge",
              desc: "We'll suggest something quick and fun. It comes with a difficulty level and time estimate so you know what you're signing up for.",
            },
            {
              step: "3️⃣",
              title: "Actually do it",
              desc: "Put down the phone. Well, maybe keep it for the recipe. But do the thing!",
            },
            {
              step: "4️⃣",
              title: "Check it off",
              desc: "Mark it done and feel that tiny (pun intended) dopamine hit. Watch your count go up.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
            >
              <span className="text-lg shrink-0 mt-0.5">{item.step}</span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
        <h2 className="text-lg font-bold text-foreground">The vibes</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 p-3.5 bg-card rounded-xl border border-border hover:-translate-y-0.5 transition-transform duration-200"
            >
              <span className="text-xl">{categoryEmoji[cat.id]}</span>
              <div>
                <span className="text-sm font-semibold text-foreground block leading-tight">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">{categoryVibes[cat.id]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="space-y-3 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <h2 className="text-lg font-bold text-foreground">But why though?</h2>
        <div className="p-5 bg-secondary/50 rounded-2xl border border-border/50">
          <p className="text-sm sm:text-base text-foreground italic leading-relaxed font-medium">
            "The best time to start something is now. The best something is something small."
          </p>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Big projects are scary. Tiny things are not. Every challenge here is designed to take
          5 minutes to an hour — just enough to break the boredom cycle without feeling like homework.
          But honestly? Sometimes a "tiny" thing turns into your new hobby. We've seen it happen.
        </p>
      </section>

      {/* Tech note */}
      <section className="space-y-2 animate-slide-up" style={{ animationDelay: "250ms" }}>
        <h2 className="text-lg font-bold text-foreground">For the curious 👀</h2>
        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
          Built with React, Tailwind, and Zustand. No backend, no database, no tracking.
          Your history lives in your browser and stays there. It's just you and your challenges.
        </p>
      </section>

      {/* Footer */}
      <section className="border-t border-border pt-6 pb-2 animate-fade-in">
        <p className="text-xs text-muted-foreground/60 text-center">
          Made with ✨ and a healthy dose of boredom
        </p>
      </section>
    </main>
  );
}
