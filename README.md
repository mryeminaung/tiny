# 🎲 Tiny

> **I'm bored. Give me something.**

Tiny is a simple and playful web app that helps people discover something interesting to do when they feel bored or don't know what to do.

---

## ✨ Features

- 7 activity categories: Create, Code, Think, Friends, Eat, Play, Outside
- Random challenge generation with difficulty & time filters
- Difficulty indicator ⭐⭐⭐
- Estimated time display
- Challenge favorites — save challenges for later
- Add notes/reflections after completing a challenge
- Ambient music player (lo-fi, rain, focus)
- Active challenge timer with countdown ring
- Local history with stats (localStorage)
- Light/dark mode
- Responsive design

---

## 🛠 Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand (state management)
- Framer Motion (animations)
- Web Audio API (ambient music)
- localStorage

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/mryeminaung/tiny.git

# Install
cd tiny
pnpm install

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── components/          # Shared UI components
│   ├── ui/              # shadcn/ui primitives (Button, Badge, Card, etc.)
│   ├── navigation.tsx   # Desktop top nav + mobile bottom bar
│   ├── footer.tsx       # Site footer
│   ├── confetti.tsx     # CSS confetti explosion
│   └── background-effects.tsx
├── features/
│   └── home/            # Home page feature
│       └── components/
│           ├── hero-section.tsx
│           ├── category-grid.tsx
│           └── challenge-card.tsx
├── pages/               # Route-level pages
│   ├── home-page.tsx
│   ├── history-page.tsx
│   └── about-page.tsx
├── stores/
│   └── use-app-store.ts # Zustand store (persisted to localStorage)
├── lib/
│   ├── challenges.ts    # Challenge data & types
│   ├── constants.ts     # Category colors, gradients, metadata
│   ├── music.ts         # Web Audio API music engine
│   └── utils.ts         # cn() utility (clsx + tailwind-merge)
├── layouts/
│   └── app-layout.tsx   # Root layout wrapper
├── App.tsx              # Router definition
├── main.tsx             # React entry point
└── index.css            # Global styles & theme variables
```

---
