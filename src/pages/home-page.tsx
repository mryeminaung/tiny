import { Button } from "@/components/ui/button";
import { categories } from "@/lib/challenges";
import { categoryDescriptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/use-app-store";
import {
	Bookmark,
	Clock,
	Flame,
	Gamepad2,
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
			<section className="relative py-24">
				<div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
					{/* Floating stat badges */}
					<motion.div
						className="flex items-center justify-center gap-3 flex-wrap"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}>
						<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
							<Zap className="size-3.5 text-amber-500" />
							{completedCount > 0 ? `${completedCount} Done` : "Ready to go"}
						</div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
							<Flame className="size-3.5 text-orange-500" />
							56 Challenges
						</div>
						<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border text-xs font-medium text-muted-foreground shadow-sm">
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
									I'm bored
								</span>
								<span className="text-primary">.</span>
							</span>
						</h1>
					</motion.div>

					{/* Tagline */}
					<motion.p
						className="text-sm sm:text-base text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.35,
							ease: [0.16, 1, 0.3, 1],
						}}>
						Give me something fun to do. Right now. No thinking required.
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
								Let's go ✨
							</Link>
						</Button>
					</motion.div>

					{/* Micro hint */}
					<motion.p
						className="text-[11px] text-muted-foreground/60 font-medium"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.5 }}>
						No signup · No tracking · Just vibes
					</motion.p>
				</div>
			</section>

			{/* ── How it works ── */}
			<section className="space-y-10 mb-20">
				<motion.div
					className="text-center md:text-left space-y-2"
					{...fadeUp(0.1)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						How it works
					</h2>
					<p className="text-sm text-muted-foreground">
						Four steps. Zero complexity.
					</p>
				</motion.div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					{[
						{
							emoji: "🎲",
							title: "Pick your vibe",
							desc: "Choose a category or let fate decide",
							color: "from-violet-500 to-purple-500",
						},
						{
							emoji: "⚡",
							title: "Get a challenge",
							desc: "Random activity with difficulty & time estimate",
							color: "from-amber-500 to-orange-500",
						},
						{
							emoji: "🔨",
							title: "Do the thing",
							desc: "Set a timer, grab your tools, give it a shot",
							color: "from-emerald-500 to-teal-500",
						},
						{
							emoji: "🎉",
							title: "Celebrate",
							desc: "Mark it done, watch the confetti, feel good",
							color: "from-rose-500 to-pink-500",
						},
					].map((step, i) => (
						<motion.div
							key={step.title}
							className="p-5 bg-card rounded-2xl border border-border shadow-sm text-center space-y-3"
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
								<span className="text-xl">{step.emoji}</span>
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
					className="text-center md:text-right space-y-2"
					{...fadeUp(0.15)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						What you get
					</h2>
					<p className="text-sm text-muted-foreground">
						No fluff. Just what matters.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
					].map((item, i) => (
						<motion.div
							key={item.title}
							className="p-5 bg-card rounded-2xl border border-border shadow-sm hover:-translate-y-0.5 transition-transform"
							{...fadeUp(0.2 + i * 0.04)}>
							<span className="text-2xl block mb-3">{item.emoji}</span>
							<h3 className="text-sm font-bold text-foreground mb-1">
								{item.title}
							</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{item.desc}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* ── Categories preview ── */}
			<section className="space-y-8 mb-20">
				<motion.div
					className="text-center md:text-left space-y-2"
					{...fadeUp(0.25)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						Pick your vibe
					</h2>
					<p className="text-sm text-muted-foreground">
						{categories.filter((c) => c.id !== "random").length} categories, 56
						challenges challenges
					</p>
				</motion.div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
								className="flex">
								<div className="p-4 bg-card rounded-2xl border border-border shadow-sm space-y-2 hover:-translate-y-0.5 transition-transform flex flex-col w-full">
									<div className="flex items-center gap-2">
										<cat.icon
											className={cn("size-5", cat.color)}
											strokeWidth={1.8}
										/>
										<span className={cn("text-sm font-bold", cat.color)}>
											{cat.label}
										</span>
									</div>
									<p className="text-xs text-muted-foreground leading-relaxed">
										{categoryDescriptions[cat.id]}
									</p>
								</div>
							</motion.div>
						))}
				</div>
			</section>

			{/* ── What makes Tiny different? ── */}
			<section className="space-y-8 mb-20">
				<motion.div
					className="text-center md:text-right space-y-2"
					{...fadeUp(0.28)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						What makes Tiny different?
					</h2>
					<p className="text-sm text-muted-foreground">
						No fluff. Just good vibes.
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-3 gap-4">
					{[
						{
							emoji: "✨",
							title: "Zero friction",
							desc: "No sign-up. No login. No tutorials. Just open and start doing.",
						},
						{
							emoji: "🎯",
							title: "Just the right amount",
							desc: "Challenges range from 5 minutes to an hour. Quick wins, not life commitments.",
						},
						{
							emoji: "🫧",
							title: "Fun-first design",
							desc: "Everything is designed to feel light, playful, and actually enjoyable to use.",
						},
					].map((item, i) => (
						<motion.div
							key={item.title}
							className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:-translate-y-0.5 transition-transform"
							{...fadeUp(0.3 + i * 0.05)}>
							<span className="text-2xl block mb-3">{item.emoji}</span>
							<h3 className="text-sm font-bold text-foreground mb-1">
								{item.title}
							</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{item.desc}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="space-y-6 mb-20">
				<motion.div
					className="text-center md:text-left space-y-2"
					{...fadeUp(0.35)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						Questions you might have
					</h2>
					<p className="text-sm text-muted-foreground">
						Quick answers, no fluff
					</p>
				</motion.div>

				<div className="grid sm:grid-cols-2 gap-4">
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
							className="p-5 bg-card rounded-2xl border border-border shadow-sm"
							{...fadeUp(0.38 + i * 0.04)}>
							<h4 className="text-sm font-bold text-foreground mb-1">
								{item.q}
							</h4>
							<p className="text-xs text-muted-foreground leading-relaxed">
								{item.a}
							</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* ── CTA ── */}
			<motion.section
				className="text-center space-y-5"
				{...fadeUp(0.42)}>
				<p className="text-sm text-muted-foreground">
					So, what are you waiting for?
				</p>
				<Button
					size="lg"
					className="px-8 text-base font-bold shadow-lg hover:scale-[1.03] active:scale-[0.97]">
					<Link
						to="/challenges"
						className="flex items-center gap-2">
						<Zap className="size-5" />
						Try Tiny now
					</Link>
				</Button>
			</motion.section>
		</section>
	);
}
