import { challenges, type Challenge } from "@/lib/challenges";
import type { HistoryEntry } from "@/stores/use-app-store";

function dateHash(dateStr: string): number {
	let hash = 0;
	for (let i = 0; i < dateStr.length; i++) {
		hash = ((hash << 5) - hash + dateStr.charCodeAt(i)) | 0;
	}
	return Math.abs(hash);
}

export function getDailyChallenge(): Challenge {
	const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local
	const idx = dateHash(today) % challenges.length;
	return challenges[idx];
}

export function isDailyCompleted(history: HistoryEntry[]): boolean {
	const daily = getDailyChallenge();
	return history.some((h) => h.challenge.id === daily.id && h.isCompleted);
}
