import { ConfettiExplosion } from "@/components/confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { categoryGradients, difficultyMeta } from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { ArrowLeft, Check, Clock, Pause, Play, Timer } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { MusicPlayer } from "./components/music-player";
import { TimerRing } from "./components/timer-ring";

function formatTime(seconds: number): string {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function ActiveChallengePage() {
	const navigate = useNavigate();
	const currentChallenge = useAppStore((s) => s.currentChallenge);
	const challengeStatus = useAppStore((s) => s.challengeStatus);
	const timeRemaining = useAppStore((s) => s.timeRemaining);
	const totalDuration = useAppStore((s) => s.totalDuration);
	const timerRunning = useAppStore((s) => s.timerRunning);
	const timerTick = useAppStore((s) => s.timerTick);
	const pauseTimer = useAppStore((s) => s.pauseTimer);
	const resumeTimer = useAppStore((s) => s.resumeTimer);
	const completeChallenge = useAppStore((s) => s.completeChallenge);
	const skipChallenge = useAppStore((s) => s.skipChallenge);
	const [showConfetti, setShowConfetti] = useState(false);

	// Redirect if no active challenge
	useEffect(() => {
		if (!currentChallenge || challengeStatus !== "active") {
			navigate("/", { replace: true });
		}
	}, [currentChallenge, challengeStatus, navigate]);

	// Timer tick
	useEffect(() => {
		if (!timerRunning) return;
		const id = setInterval(() => {
			timerTick();
		}, 1000);
		return () => clearInterval(id);
	}, [timerRunning, timerTick]);

	// Handle completion
	useEffect(() => {
		if (challengeStatus === "completed") {
			setShowConfetti(true);
		}
	}, [challengeStatus]);

	const handleBack = useCallback(() => {
		skipChallenge();
		navigate("/");
	}, [skipChallenge, navigate]);

	const handleDone = useCallback(() => {
		setShowConfetti(true);
		setTimeout(() => {
			completeChallenge();
			navigate("/");
		}, 1500);
	}, [completeChallenge, navigate]);

	const handleToggleTimer = useCallback(() => {
		if (timerRunning) {
			pauseTimer();
		} else {
			resumeTimer();
		}
	}, [timerRunning, pauseTimer, resumeTimer]);

	if (!currentChallenge) return null;

	const cat = categories.find((c) => c.id === currentChallenge.category);
	const gradient =
		categoryGradients[currentChallenge.category] || categoryGradients.think;
	const progress =
		totalDuration > 0 ? (totalDuration - timeRemaining) / totalDuration : 0;
	const isComplete = challengeStatus === "completed";
	const elapsed = totalDuration - timeRemaining;

	return (
		<div className="min-h-[calc(90vh-80px)] flex items-center justify-center px-4 py-8">
			{showConfetti && (
				<ConfettiExplosion
					particleCount={40}
					className="fixed inset-0 pointer-events-none overflow-hidden z-50"
				/>
			)}

			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
				className="w-full max-w-4xl space-y-5">
				{/* Header */}
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						onClick={handleBack}>
						<ArrowLeft className="size-5" />
						Back
					</Button>
					<div className="flex items-center gap-3">
						<span className="text-xs text-muted-foreground font-medium">
							{currentChallenge.timeEstimate}
						</span>
						<span
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
							style={{ background: gradient }}>
							{cat?.icon && <cat.icon className="size-3.5" />}
							{cat?.label}
						</span>
					</div>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
					{/* Timer — takes 2 cols on desktop */}
					<motion.div
						className="lg:col-span-2 relative bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center gap-5 shadow-sm"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.5 }}>
						{/* Glow */}
						<div
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-15 blur-3xl"
							style={{ background: gradient }}
						/>

						<div className="relative">
							<TimerRing
								progress={progress}
								category={currentChallenge.category}
							/>
							<div className="absolute inset-0 flex flex-col items-center justify-center">
								{isComplete ? (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 300, damping: 15 }}
										className="flex flex-col items-center gap-1">
										<span className="text-4xl">🎉</span>
										<span className="text-sm font-bold text-emerald-500">
											Done!
										</span>
									</motion.div>
								) : (
									<>
										<span className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums tracking-tight">
											{formatTime(timeRemaining)}
										</span>
										<span className="text-[11px] text-muted-foreground font-medium mt-1">
											{timerRunning ? "in progress" : "paused"}
										</span>
									</>
								)}
							</div>
						</div>

						{/* Controls */}
						{!isComplete && (
							<div className="flex items-center gap-2.5">
								<Button
									variant="default"
									onClick={handleToggleTimer}
									className="shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]">
									{timerRunning ? (
										<>
											<Pause className="size-4" /> Pause
										</>
									) : (
										<>
											<Play className="size-4" /> Resume
										</>
									)}
								</Button>
								<Button
									variant="outline"
									onClick={handleDone}
									className="hover:scale-[1.02] active:scale-[0.97]">
									<Check className="size-4" />
									Done!
								</Button>
							</div>
						)}
					</motion.div>

					{/* Right column — takes 3 cols */}
					<div className="lg:col-span-3 flex flex-col gap-5">
						{/* Challenge Info */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-sm flex-1">
							<div className="flex items-start justify-between gap-3">
								<h2 className="text-xl font-bold text-foreground leading-snug">
									{currentChallenge.title}
								</h2>
							</div>

							{/* Badges */}
							<div className="flex flex-wrap items-center gap-2">
								<Badge
									variant="default"
									className="gap-1.5 font-bold"
									style={{ background: gradient }}>
									{cat?.icon && <cat.icon className="size-3" />}
									{cat?.label}
								</Badge>
								<Badge variant="secondary" className="gap-1.5">
									{difficultyMeta[currentChallenge.difficulty - 1].emoji}
									{difficultyMeta[currentChallenge.difficulty - 1].label}
								</Badge>
								<Badge variant="secondary" className="gap-1.5">
									<Timer className="size-3" />
									{currentChallenge.timeEstimate}
								</Badge>
								{elapsed > 0 && !isComplete && (
									<Badge variant="secondary" className="gap-1.5">
										<Clock className="size-3" />
										{formatTime(elapsed)} elapsed
									</Badge>
								)}
							</div>

							<p className="text-muted-foreground text-sm leading-relaxed">
								{currentChallenge.description}
							</p>
						</motion.div>

						{/* Music Player */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.5 }}>
							<MusicPlayer />
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
