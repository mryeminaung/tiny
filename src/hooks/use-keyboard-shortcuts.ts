import { useEffect } from "react";

interface KeyboardShortcutOptions {
	onPauseResume: () => void;
	onDone: () => void;
	onBack: () => void;
}

export function useKeyboardShortcuts({
	onPauseResume,
	onDone,
	onBack,
}: KeyboardShortcutOptions) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const tag = (e.target as HTMLElement).tagName;
			if (
				tag === "INPUT" ||
				tag === "TEXTAREA" ||
				(e.target as HTMLElement).isContentEditable
			)
				return;

			switch (e.code) {
				case "Space":
					e.preventDefault();
					onPauseResume();
					break;
				case "Enter":
					e.preventDefault();
					onDone();
					break;
				case "Escape":
					e.preventDefault();
					onBack();
					break;
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onPauseResume, onDone, onBack]);
}
