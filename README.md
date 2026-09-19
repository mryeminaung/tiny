# 🎲 Tiny

> **I'm bored. Give me something.**

Tiny is a simple and playful web app that helps people discover something interesting to do when they feel bored or don't know what to do.

---

## ✨ Features

- 7 activity categories: Create, Code, Think, Friends, Eat, Play, Outside
- Random challenge generation
- Difficulty indicator ⭐⭐⭐
- Estimated time display
- Mark activities as completed
- Local history (localStorage)
- Responsive design

---

## 🛠 Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Zustand
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
  components/
    CategoryPicker.tsx
    ChallengeCard.tsx
    HistoryList.tsx
  lib/
    challenges.ts      # Challenge data
    store.ts           # Zustand store
  App.tsx
  main.tsx
```

---
