import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Challenge } from "./challenges";
import { getRandomChallenge } from "./challenges";

export type Theme = "light" | "dark";

export interface HistoryEntry {
  challenge: Challenge;
  completedAt: string;
  isCompleted: boolean;
}

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Challenge state
  currentCategory: Category | null;
  currentChallenge: Challenge | null;
  history: HistoryEntry[];

  // Actions
  setCategory: (category: Category) => void;
  generateChallenge: () => void;
  markComplete: () => void;
  toggleComplete: (id: string) => void;
  clearHistory: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "light" as Theme,
      currentCategory: null,
      currentChallenge: null,
      history: [],

      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next });
      },

      setCategory: (category) => {
        set({ currentCategory: category });
        const challenge = getRandomChallenge(category);
        set({ currentChallenge: challenge });
      },

      generateChallenge: () => {
        const { currentCategory } = get();
        const challenge = getRandomChallenge(currentCategory);
        set({ currentChallenge: challenge });
      },

      markComplete: () => {
        const { currentChallenge, history } = get();
        if (!currentChallenge) return;

        const entry: HistoryEntry = {
          challenge: currentChallenge,
          completedAt: new Date().toISOString(),
          isCompleted: true,
        };

        set({ history: [entry, ...history] });

        const next = getRandomChallenge(get().currentCategory);
        set({ currentChallenge: next });
      },

      toggleComplete: (id) => {
        const { history } = get();
        set({
          history: history.map((entry) =>
            entry.challenge.id === id
              ? { ...entry, isCompleted: !entry.isCompleted }
              : entry
          ),
        });
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "tiny-history",
      partialize: (state) => ({ history: state.history, theme: state.theme }),
      onRehydrate: () => {
        return (state) => {
          if (state) applyTheme(state.theme);
        };
      },
    }
  )
);
