import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Challenge } from "./challenges";
import { getRandomChallenge } from "./challenges";

export type Page = "home" | "history" | "about";

export interface HistoryEntry {
  challenge: Challenge;
  completedAt: string;
  isCompleted: boolean;
}

interface AppState {
  // Navigation
  page: Page;
  setPage: (page: Page) => void;

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

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      page: "home",
      currentCategory: null,
      currentChallenge: null,
      history: [],

      setPage: (page) => set({ page }),

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

        // Generate next challenge
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
      partialize: (state) => ({ history: state.history }),
    }
  )
);
