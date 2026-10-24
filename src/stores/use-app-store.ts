import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Challenge, Energy, Mood } from "@/lib/challenges";
import { getRandomChallenge } from "@/lib/challenges";
import { musicEngine, type Station } from "@/lib/music";

export type Theme = "lavender" | "sunset" | "ocean" | "forest" | "dark";
export type ChallengeStatus = "idle" | "active" | "completed";

export interface HistoryEntry {
	challenge: Challenge;
	completedAt: string;
	isCompleted: boolean;
	note?: string;
}

function parseTimeEstimate(str: string): number {
	const match = str.match(/(\d+)\s*(min|hour|hr)/i);
	if (!match) return 300; // default 5 min
	const val = parseInt(match[1], 10);
	if (/hour|hr/i.test(match[2])) return val * 3600;
	return val * 60;
}

interface AppState {
	// Theme
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;

	// Challenge state
	currentCategory: Category | null;
	currentChallenge: Challenge | null;
	challengeStatus: ChallengeStatus;
	history: HistoryEntry[];

	// Timer state
	timeRemaining: number;
	timerRunning: boolean;
	totalDuration: number;

	// Music state
	musicPlaying: boolean;
	musicStation: Station;

	// Favorites
	favorites: Challenge[];
	toggleFavorite: (challenge: Challenge) => void;

	// Filters
	difficultyFilter: number | null;
	maxTimeFilter: number | null;
	moodFilter: Mood | null;
	energyFilter: Energy | null;
	setDifficultyFilter: (diff: number | null) => void;
	setMaxTimeFilter: (minutes: number | null) => void;
	setMoodFilter: (mood: Mood | null) => void;
	setEnergyFilter: (energy: Energy | null) => void;
	resetFilters: () => void;
	clearCurrentChallenge: () => void;

	// Actions
	startChallenge: (challenge: Challenge) => void;
	startFavoriteChallenge: (challenge: Challenge) => void;
	setCategory: (category: Category) => void;
	generateForCategory: (category: Category) => void;
	generateChallenge: () => void;
	acceptChallenge: () => void;
	pauseTimer: () => void;
	resumeTimer: () => void;
	timerTick: () => void;
	completeChallenge: () => void;
	skipChallenge: () => void;
	markComplete: () => void;
	toggleComplete: (id: string) => void;
	addNote: (challengeId: string, note: string) => void;
	clearHistory: () => void;
	setMusicStation: (station: Station) => void;
	toggleMusic: () => void;
}

export function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.remove("theme-lavender", "theme-sunset", "theme-ocean", "theme-forest", "theme-dark", "dark");
	root.classList.add(`theme-${theme}`);
	if (theme === "dark") root.classList.add("dark");
}

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			theme: "lavender" as Theme,
			currentCategory: null,
			currentChallenge: null,
			challengeStatus: "idle" as ChallengeStatus,
			history: [],
			timeRemaining: 0,
			timerRunning: false,
			totalDuration: 0,
			musicPlaying: false,
			musicStation: "none" as Station,
			favorites: [],
			difficultyFilter: null,
			maxTimeFilter: null,
			moodFilter: null,
			energyFilter: null,

			toggleTheme: () => {
				const next = get().theme === "dark" ? "lavender" : "dark";
				applyTheme(next);
				set({ theme: next });
			},

			setTheme: (theme) => {
				applyTheme(theme);
				set({ theme });
			},

			startChallenge: (challenge) => {
				const seconds = parseTimeEstimate(challenge.timeEstimate);
				set({
					currentChallenge: challenge,
					currentCategory: challenge.category,
					challengeStatus: "active",
					timeRemaining: seconds,
					totalDuration: seconds,
					timerRunning: true,
				});
			},

			startFavoriteChallenge: (challenge) => {
				const seconds = parseTimeEstimate(challenge.timeEstimate);
				set({
					currentChallenge: challenge,
					currentCategory: challenge.category,
					challengeStatus: "active",
					timeRemaining: seconds,
					totalDuration: seconds,
					timerRunning: true,
				});
			},

			setCategory: (category) => {
				const { difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
				set({ currentCategory: category });
				const challenge = getRandomChallenge(category, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
				set({ currentChallenge: challenge, challengeStatus: "idle" });
			},

			generateForCategory: (category) => {
				const { difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
				const challenge = getRandomChallenge(category, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
				set({ currentChallenge: challenge, challengeStatus: "idle", currentCategory: category === "random" ? null : category });
			},

			generateChallenge: () => {
				const { currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
				const challenge = getRandomChallenge(currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
				set({ currentChallenge: challenge, challengeStatus: "idle" });
			},

			acceptChallenge: () => {
				const { currentChallenge } = get();
				if (!currentChallenge) return;
				const seconds = parseTimeEstimate(currentChallenge.timeEstimate);
				set({
					challengeStatus: "active",
					timeRemaining: seconds,
					totalDuration: seconds,
					timerRunning: true,
				});
			},

			pauseTimer: () => {
				set({ timerRunning: false });
			},

			resumeTimer: () => {
				set({ timerRunning: true });
			},

			timerTick: () => {
				const { timeRemaining, timerRunning } = get();
				if (!timerRunning) return;
				if (timeRemaining <= 0) {
					set({ timerRunning: false, challengeStatus: "completed" });
					return;
				}
				set({ timeRemaining: timeRemaining - 1 });
			},

			completeChallenge: () => {
				const { currentChallenge, history } = get();
				if (!currentChallenge) return;

				musicEngine.stop();

				const entry: HistoryEntry = {
					challenge: currentChallenge,
					completedAt: new Date().toISOString(),
					isCompleted: true,
				};

				set({
					history: [entry, ...history],
					challengeStatus: "completed",
					timerRunning: false,
					musicPlaying: false,
					musicStation: "none",
				});

				// Auto-next after confetti
				setTimeout(() => {
					const { currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
					const next = getRandomChallenge(currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
					set({ currentChallenge: next, challengeStatus: "idle", timeRemaining: 0 });
				}, 2500);
			},

			skipChallenge: () => {
				musicEngine.stop();
				const { currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
				const next = getRandomChallenge(currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
				set({
					currentChallenge: next,
					challengeStatus: "idle",
					timeRemaining: 0,
					timerRunning: false,
					musicPlaying: false,
					musicStation: "none",
				});
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

				const { difficultyFilter, maxTimeFilter, moodFilter, energyFilter } = get();
				const next = getRandomChallenge(get().currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energyFilter);
				set({ currentChallenge: next, challengeStatus: "idle" });
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

			addNote: (challengeId, note) => {
				const { history } = get();
				set({
					history: history.map((entry) =>
						entry.challenge.id === challengeId
							? { ...entry, note }
							: entry
					),
				});
			},

			toggleFavorite: (challenge) => {
				const { favorites } = get();
				const exists = favorites.some((f) => f.id === challenge.id);
				set({
					favorites: exists
						? favorites.filter((f) => f.id !== challenge.id)
						: [...favorites, challenge],
				});
			},

			setDifficultyFilter: (diff) => {
				set({ difficultyFilter: diff });
				const { currentCategory, maxTimeFilter, moodFilter, energyFilter, currentChallenge } = get();
				if (currentChallenge) {
					const next = getRandomChallenge(currentCategory, diff, maxTimeFilter, moodFilter, energyFilter);
					set({ currentChallenge: next });
				}
			},

			setMaxTimeFilter: (minutes) => {
				set({ maxTimeFilter: minutes });
				const { currentCategory, difficultyFilter, moodFilter, energyFilter, currentChallenge } = get();
				if (currentChallenge) {
					const next = getRandomChallenge(currentCategory, difficultyFilter, minutes, moodFilter, energyFilter);
					set({ currentChallenge: next });
				}
			},

			setMoodFilter: (mood) => {
				set({ moodFilter: mood });
				const { currentCategory, difficultyFilter, maxTimeFilter, energyFilter, currentChallenge } = get();
				if (currentChallenge) {
					set({ currentChallenge: getRandomChallenge(currentCategory, difficultyFilter, maxTimeFilter, mood, energyFilter) });
				}
			},

			setEnergyFilter: (energy) => {
				set({ energyFilter: energy });
				const { currentCategory, difficultyFilter, maxTimeFilter, moodFilter, currentChallenge } = get();
				if (currentChallenge) {
					set({ currentChallenge: getRandomChallenge(currentCategory, difficultyFilter, maxTimeFilter, moodFilter, energy) });
				}
			},

			resetFilters: () => {
				set({
					difficultyFilter: null,
					maxTimeFilter: null,
					moodFilter: null,
					energyFilter: null,
				});
			},

			clearCurrentChallenge: () => {
				set({ currentChallenge: null, challengeStatus: "idle" });
			},

			clearHistory: () => set({ history: [] }),

			setMusicStation: (station) => {
				if (station === "none") {
					musicEngine.stop();
					set({ musicStation: "none", musicPlaying: false });
				} else {
					musicEngine.play(station);
					set({ musicStation: station, musicPlaying: true });
				}
			},

			toggleMusic: () => {
				const { musicStation, musicPlaying } = get();
				if (musicPlaying) {
					musicEngine.stop();
					set({ musicPlaying: false });
				} else {
					const station = musicStation === "none" ? "lofi" : musicStation;
					musicEngine.play(station);
					set({ musicStation: station, musicPlaying: true });
				}
			},
		}),
		{
			name: "tiny-history",
			partialize: (state) => ({ history: state.history, theme: state.theme, favorites: state.favorites }),
		}
	)
);
