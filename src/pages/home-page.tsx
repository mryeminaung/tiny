import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { categoryDescriptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/use-app-store";
import {
	Bookmark,
	Clock,
	Compass,
	Dices,
	Flame,
	Gamepad2,
	PartyPopper,
	Play,
	Shuffle,
	Sparkles,
	Timer,
	Trophy,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function HomePage() {
	const history = useAppStore((s) => s.history);
	const completedCount = history.filter((h) => h.isCompleted).length;

	return (
		<section className="">
			{/* ── Hero ── */}
			<section className="relative py-16 sm:py-24">
				<div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 max-w-5xl mx-auto">
					<div className="space-y-6 text-left">
					{/* Floating stat badges */}
					<motion.div
						className="flex flex-wrap items-center justify-start gap-3"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}>
						<div className="glass-subtle inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
							<Zap className="size-3.5 text-amber-500" />
							{completedCount > 0 ? `${completedCount} Done` : "Ready to go"}
						</div>
						<div className="glass-subtle inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
							<Flame className="size-3.5 text-orange-500" />
							56 Challenges
						</div>
						<div className="glass-subtle inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
							<Trophy className="size-3.5 text-violet-500" />7 Vibes
						</div>
					</motion.div>

					{/* Main headline */}
					<motion.div
						className="space-y-3"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
						<h1 className="text-balance">
							<span className="block text-[3.5rem] sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.85]">
								<span className="bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
									I'm bored.
								</span>
								<span className="block text-[2.5rem] sm:text-6xl lg:text-7xl text-primary">Let's fix that.</span>
							</span>
						</h1>
					</motion.div>

					{/* Tagline */}
					<motion.p
						className="mx-0 max-w-lg text-base font-medium leading-relaxed text-muted-foreground sm:text-lg"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.35,
							ease: [0.16, 1, 0.3, 1],
						}}>
						A tiny challenge, picked for your mood, energy, and time.
					</motion.p>

					{/* CTA Button */}
					<motion.div
						className="pt-1"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.45,
							ease: [0.16, 1, 0.3, 1],
						}}>
						<Button
							size="lg"
							className="px-10 text-sm sm:text-base font-bold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.04] active:scale-[0.97]">
							<Link
								to="/challenges"
								className="flex items-center gap-2">
								<Sparkles className="size-5" />
								Surprise me
							</Link>
						</Button>
					</motion.div>

					{/* Micro hint */}
					<motion.p
						className="hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.5 }}>
						No signup · No tracking · Just vibes
					</motion.p>
					</div>

					<motion.div
						className="hidden sm:flex relative min-h-[280px] items-center justify-center"
						initial={{ opacity: 0, y: 20, rotate: 2 }}
						animate={{ opacity: 1, y: 0, rotate: 0 }}
						transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
						aria-label="A playful dice illustration representing a random challenge">
						<div className="absolute size-64 rounded-full border-2 border-primary/20 rotate-12" aria-hidden="true" />
						<div className="absolute size-52 rounded-[2.5rem] border border-primary/25 -rotate-6" aria-hidden="true" />
						<div className="relative flex size-44 rotate-6 items-center justify-center rounded-[2.5rem] bg-primary/10 text-primary shadow-xl shadow-primary/10">
							<Dices className="size-28" strokeWidth={1.35} aria-hidden="true" />
							<span className="absolute -right-3 -top-3 flex size-12 -rotate-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">?</span>
						</div>
					</motion.div>

					<motion.div
						className="relative"
						style={{ display: "none" }}
						initial={{ opacity: 0, y: 20, rotate: 2 }}
						animate={{ opacity: 1, y: 0, rotate: 0 }}
						transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
						<div className="absolute -right-5 -top-5 size-24 rounded-full bg-violet-400/25 blur-2xl" aria-hidden="true" />
						<div className="absolute -bottom-6 -left-6 size-28 rounded-full bg-pink-400/20 blur-2xl" aria-hidden="true" />
						<div className="glass relative rounded-[2rem] p-6 sm:p-8 shadow-2xl shadow-violet-900/10">
							<div className="flex items-center justify-between gap-4 mb-8">
								<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
									<Sparkles className="size-4" aria-hidden="true" />
									Your next challenge
								</div>
								<span className="size-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" aria-label="Ready" />
							</div>
							<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
								Make a fancy coffee drink
							</h2>
							<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
								Channel your inner barista. Froth, pour, and enjoy something you made yourself.
							</p>
							<div className="flex items-center gap-2 flex-wrap mt-6">
								<span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700">Relaxed</span>
								<span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
									<Clock className="size-3.5" aria-hidden="true" />10 min
								</span>
								<span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Easy</span>
							</div>
							<div className="mt-8 flex items-center justify-between gap-4 border-t border-border/60 pt-5">
								<span className="text-xs font-medium text-muted-foreground">No pressure. Just vibes.</span>
								<Link to="/challenges" className="text-sm font-bold text-primary hover:underline underline-offset-4">Explore <span aria-hidden="true">→</span></Link>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ── How it works ── */}
			<section className="space-y-10 mb-20">
				<motion.div
					className="space-y-2 text-left"
					{...fadeUp(0.1)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						How it works
					</h2>
					<p className="text-sm text-muted-foreground">
						Four steps. Zero complexity.
					</p>
				</motion.div>

				<div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
					<div
						className="absolute left-1/2 top-11 bottom-11 w-0.5 -translate-x-1/2 bg-primary/45 sm:hidden"
						aria-hidden="true"
					/>
					<div
						className="absolute left-[12.5%] right-[12.5%] top-11 hidden h-0.5 bg-primary/45 sm:block"
						aria-hidden="true"
					/>
					{[
						{
							icon: Compass,
							title: "Pick your vibe",
							desc: "Choose a category or let fate decide",
							color: "from-violet-500 to-purple-500",
						},
						{
							icon: Shuffle,
							title: "Get a challenge",
							desc: "Random activity with difficulty & time estimate",
							color: "from-amber-500 to-orange-500",
						},
						{
							icon: Play,
							title: "Do the thing",
							desc: "Set a timer, grab your tools, give it a shot",
							color: "from-emerald-500 to-teal-500",
						},
						{
							icon: PartyPopper,
							title: "Celebrate",
							desc: "Mark it done, watch the confetti, feel good",
							color: "from-rose-500 to-pink-500",
						},
					].map((step, i) => (
						<motion.div
							key={step.title}
							className="glass relative z-10 col-span-2 sm:col-span-1 p-5 rounded-2xl text-center space-y-3 sm:min-h-[190px]"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.2 + i * 0.08,
								ease: [0.16, 1, 0.3, 1],
							}}>
							<motion.div
								className={cn(
									"size-12 mx-auto rounded-full flex items-center justify-center border-2 border-background shadow-lg",
									`bg-gradient-to-br ${step.color}`,
								)}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 300,
									damping: 20,
									delay: 0.35 + i * 0.08,
								}}>
								<step.icon className="size-6 text-white" strokeWidth={2.2} />
								<span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-background text-sm font-extrabold text-foreground shadow-md ring-2 ring-background/70">
									{i + 1}
								</span>
							</motion.div>
							<div>
								<h3 className="text-sm font-bold text-foreground mb-1">
									{step.title}
								</h3>
								<p className="text-xs text-muted-foreground leading-relaxed">
									{step.desc}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* ── Features ── */}
			<section className="space-y-8 mb-20">
				<motion.div
					className="space-y-2 text-left"
					{...fadeUp(0.15)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						What you get
					</h2>
					<p className="text-sm text-muted-foreground">
						No fluff. Just what matters.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
					{[
						{
							icon: Gamepad2,
							emoji: "🎮",
							title: "56 challenges",
							desc: "Across 7 creative categories — code, create, think, play, and more",
						},
						{
							icon: Timer,
							emoji: "⏱️",
							title: "Built-in timer",
							desc: "Accept a challenge and count down with a visual timer ring",
						},
						{
							icon: Clock,
							emoji: "🎵",
							title: "Ambient music",
							desc: "Lo-fi, rain, or focus binaural beats while you work",
						},
						{
							icon: Bookmark,
							emoji: "📌",
							title: "Save for later",
							desc: "Bookmark challenges you want to do when the time is right",
						},
						{
							icon: Sparkles,
							emoji: "🎯",
							title: "Smart filters",
							desc: "Filter by difficulty level and time available",
						},
						{
							icon: Flame,
							emoji: "📝",
							title: "Add notes",
							desc: "Jot down reflections after completing a challenge",
						},
					].slice(0, 3).map((item, i) => (
						<motion.div
							key={item.title}
							className="glass flex h-full flex-col rounded-2xl p-5 transition-transform hover:-translate-y-1"
							{...fadeUp(0.2 + i * 0.04)}>
							<item.icon className="mb-4 size-6 text-primary" strokeWidth={1.8} />
							<h3 className="mb-1 text-sm font-bold text-foreground">
								{item.title}
							</h3>
							<p className="text-xs leading-relaxed text-muted-foreground">
								{item.desc}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* ── Categories preview ── */}
			<section className="space-y-8 mb-20">
				<motion.div
					className="space-y-2 text-left"
					{...fadeUp(0.25)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						Pick your vibe
					</h2>
					<p className="text-sm text-muted-foreground">
						{categories.filter((c) => c.id !== "random").length} vibes · 56 challenges
					</p>
				</motion.div>

				<div className="grid auto-rows-[118px] grid-cols-2 gap-4 sm:grid-rows-[132px_132px_132px_104px]">
					{categories
						.filter((c) => c.id !== "random")
						.map((cat, i) => (
							<motion.div
								key={cat.id}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: 0.3 + i * 0.04,
									ease: [0.16, 1, 0.3, 1],
								}}
								className={cn(
									"flex h-full",
									i === 0 && "sm:col-span-2 sm:row-span-2",
									i === 1 && "sm:col-start-3",
									i === 2 && "sm:col-start-4",
									i === 3 && "sm:col-start-3 sm:col-span-2 sm:row-start-2 sm:row-span-3",
									i === 4 && "sm:col-start-1 sm:row-start-3",
									i === 5 && "sm:col-start-2 sm:row-start-3",
									i === 6 && "sm:col-start-1 sm:col-span-2 sm:row-start-4",
								)}>
								<div
									className={cn(
										"flex h-full w-full flex-col rounded-[1.5rem] border border-white/55 bg-white/20 p-4 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/35 hover:shadow-md",
										i === 0 && "bg-gradient-to-br from-violet-500/15 via-white/25 to-pink-500/10 p-5 sm:p-6",
									)}>
									<div className="flex items-center gap-2.5">
										<div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background/55 shadow-sm">
											<cat.icon className={cn("size-5", cat.color)} strokeWidth={1.8} />
										</div>
										<span className={cn("text-sm font-bold", i === 0 && "sm:text-base", cat.color)}>{cat.label}</span>
									</div>
									<p className={cn("mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground", i === 0 && "sm:text-sm")}>
										{categoryDescriptions[cat.id]}
									</p>
								</div>
							</motion.div>
						))}
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="space-y-6 mb-14">
				<motion.div
					className="space-y-2 text-left"
					{...fadeUp(0.35)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						Questions you might have
					</h2>
					<p className="text-sm text-muted-foreground">
						Quick answers, no fluff
					</p>
				</motion.div>

				<div className="mx-auto grid w-full max-w-5xl gap-3 md:grid-cols-2">
					{[
						{
							q: "Is Tiny free?",
							a: "Yeah. Completely free. No premium tier. No 'pay to unlock more vibes'. Just free.",
						},
						{
							q: "Do I need to create an account?",
							a: "Nope. Zero accounts. Open the app and you're in.",
						},
						{
							q: "How many challenges are there?",
							a: "Currently 56, organized across 7 categories. We add new ones regularly.",
						},
						{
							q: "Can I save challenges for later?",
							a: "Yes! Bookmark any challenge and find it in your Saved page. Your progress is stored locally in your browser.",
						},
					].map((item, i) => (
						<motion.div
							key={item.q}
							className="glass h-full rounded-2xl"
							{...fadeUp(0.38 + i * 0.04)}>
							<details className="group p-5">
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-foreground [&::-webkit-details-marker]:hidden">
									{item.q}
									<span className="text-lg font-normal text-muted-foreground transition-transform group-open:rotate-45">+</span>
								</summary>
								<p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
									{item.a}
								</p>
							</details>
						</motion.div>
					))}
				</div>
			</section>
		</section>
	);
}
