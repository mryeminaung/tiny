import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { CategoryGrid, ChallengeCard, FilterBar } from "@/features/challenges";
import { useAppStore } from "@/stores/use-app-store";
import { Dices } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const ROLL_MESSAGES = [
	"Consulting the boredom oracle…",
	"Rolling for a tiny adventure…",
	"Finding your next plot twist…",
];

export function ChallengesPage() {
	const currentChallenge = useAppStore((s) => s.currentChallenge);
	const history = useAppStore((s) => s.history);
	const generateForCategory = useAppStore((s) => s.generateForCategory);
	const resetFilters = useAppStore((s) => s.resetFilters);
	const clearCurrentChallenge = useAppStore((s) => s.clearCurrentChallenge);
	const [isRolling, setIsRolling] = useState(false);
	const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
	const [rollMessage, setRollMessage] = useState(ROLL_MESSAGES[0]);

	useEffect(() => {
		if (!isRolling) return;
		setRollMessage(
			ROLL_MESSAGES[Math.floor(Math.random() * ROLL_MESSAGES.length)],
		);
		const timeout = window.setTimeout(() => {
			generateForCategory("random");
			setIsRolling(false);
			setIsSurpriseOpen(true);
		}, 650);
		return () => window.clearTimeout(timeout);
	}, [isRolling, generateForCategory]);

	const handleSurprise = () => {
		if (isRolling) return;
		setIsRolling(true);
	};

	const handleDialogChange = (open: boolean) => {
		setIsSurpriseOpen(open);
		if (!open) {
			resetFilters();
			clearCurrentChallenge();
		}
	};

	return (
		<section className="py-8 sm:py-14">
			<motion.div
				className="space-y-2 mb-10"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
				<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
					What are you in the mood for?
				</h1>
				<p className="text-xs text-muted-foreground">
					Choose a vibe, set your filters, and let's go{" "}
				</p>
			</motion.div>

			<CategoryGrid />

			<FilterBar />

			{!currentChallenge && (
				<motion.div
					className="flex flex-col items-center gap-4 mt-10"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
					<Button
						onClick={handleSurprise}
						disabled={isRolling}
						size="lg"
						className="px-8 text-base font-bold shadow-lg hover:scale-[1.03] active:scale-[0.97] overflow-hidden hover:cursor-pointer">
						<Dices className={isRolling ? "size-5 animate-spin" : "size-5"} />
						Surprise me
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
					</Button>
					{isRolling && (
						<p
							className="text-xs font-medium text-primary"
							role="status"
							aria-live="polite">
							{rollMessage}
						</p>
					)}
					{history.length > 0 && (
						<p className="text-xs text-muted-foreground">
							{history.length} challenge{history.length !== 1 ? "s" : ""}{" "}
							completed ✨
						</p>
					)}
				</motion.div>
			)}

			<Dialog
				open={isSurpriseOpen}
				onOpenChange={handleDialogChange}>
				<DialogContent className="max-w-2xl border-0 bg-transparent p-0 shadow-none [&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-background/80">
					<DialogTitle className="sr-only">Your surprise challenge</DialogTitle>
					<DialogDescription className="sr-only">
						Review your randomly selected challenge and choose what to do next.
					</DialogDescription>
					{currentChallenge && <ChallengeCard />}
				</DialogContent>
			</Dialog>
		</section>
	);
}
