import { categories } from "@/lib/challenges";
import {
	categoryBg,
	categoryBorder,
	categoryDescriptions,
	categoryEmoji,
} from "@/lib/constants";
import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { ArrowRight, Coffee, Heart, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

// const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
// 	create: Paintbrush,
// 	code: Code,
// 	think: Brain,
// 	friends: Users,
// 	eat: UtensilsCrossed,
// 	play: Gamepad2,
// 	outside: TreePine,
// 	random: Sparkles,
// };

const steps = [
	{
		num: "01",
		emoji: "🎲",
		title: "Pick your vibe",
		desc: "Choose a category — code, create, think, play, or just hit 'random' and let fate decide.",
		color: "from-violet-500 to-purple-500",
		dotColor: "bg-violet-500",
	},
	{
		num: "02",
		emoji: "⚡",
		title: "Get a challenge",
		desc: "We'll generate a random activity with difficulty, time estimate, and a fun description.",
		color: "from-amber-500 to-orange-500",
		dotColor: "bg-amber-500",
	},
	{
		num: "03",
		emoji: "🔨",
		title: "Do the thing",
		desc: "Actually do it. Set a timer, grab your tools, and give it a real shot.",
		color: "from-emerald-500 to-teal-500",
		dotColor: "bg-emerald-500",
	},
	{
		num: "04",
		emoji: "🎉",
		title: "Celebrate",
		desc: "Mark it done, watch the confetti, and feel good about yourself. You earned it.",
		color: "from-rose-500 to-pink-500",
		dotColor: "bg-rose-500",
	},
];

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function AboutPage() {
	const generateForCategory = useAppStore((s) => s.generateForCategory);

	return (
		<main className="mx-auto max-w-5xl px-6 pb-24 pt-10 sm:pt-16 space-y-20 sm:space-y-28">
			{/* ── Hero ── */}
			<section className="text-center space-y-4 max-w-xl mx-auto">
				<motion.div
					{...fadeUp(0)}
					className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
					<Coffee className="size-3.5" />
					built by a student who was bored too
				</motion.div>
				<motion.h1
					className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
					{...fadeUp(0.05)}>
					what is Tiny?
				</motion.h1>
				<motion.p
					className="text-muted-foreground leading-relaxed text-sm"
					{...fadeUp(0.1)}>
					Tiny is your boredom-fighting companion. We give you something fun,
					interesting, or challenging to do — instantly. No signup, no tracking,
					no ads. Just pure activities when your brain is looking for something
					to do.
				</motion.p>
			</section>

			{/* ── How it works — Timeline ── */}
			<section className="space-y-10">
				<motion.div
					className="text-center space-y-2"
					{...fadeUp(0.15)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						how it works
					</h2>
					<p className="text-sm text-muted-foreground">
						Four steps. Zero complexity.
					</p>
				</motion.div>

				<div className="relative max-w-2xl mx-auto">
					<div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px">
						<motion.div
							className="w-full h-full bg-gradient-to-b from-border via-border/60 to-transparent"
							initial={{ scaleY: 0, transformOrigin: "top" }}
							animate={{ scaleY: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.3,
								ease: [0.16, 1, 0.3, 1],
							}}
						/>
						<div className="absolute inset-0 w-full bg-[length:6px_16px] bg-[linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] opacity-10 dark:opacity-15" />
					</div>

					<div className="space-y-10">
						{steps.map((step, i) => (
							<motion.div
								key={step.num}
								className="relative flex gap-5 sm:gap-7"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									delay: 0.3 + i * 0.12,
									ease: [0.16, 1, 0.3, 1],
								}}>
								<div className="relative shrink-0 z-10">
									<motion.div
										className={cn(
											"size-12 sm:size-16 rounded-2xl flex items-center justify-center border-2 border-background shadow-lg",
											`bg-gradient-to-br ${step.color}`,
										)}
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 20,
											delay: 0.4 + i * 0.12,
										}}>
										<span className="text-xl sm:text-2xl">{step.emoji}</span>
									</motion.div>
									<motion.div
										className={cn(
											"absolute inset-0 rounded-2xl",
											`bg-gradient-to-br ${step.color}`,
										)}
										initial={{ opacity: 0 }}
										animate={{ opacity: [0, 0.3, 0], scale: [1, 1.4, 1.6] }}
										transition={{
											duration: 2,
											delay: 0.6 + i * 0.15,
											ease: "easeOut",
										}}
									/>
								</div>

								<div className="flex-1 pb-2">
									<div className="flex items-baseline gap-2 mb-1">
										<span className="text-[11px] font-bold text-muted-foreground/50 tracking-wider">
											STEP {step.num}
										</span>
									</div>
									<h3 className="text-lg font-bold text-foreground mb-1">
										{step.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{step.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ── Categories ── */}
			<section className="space-y-10">
				<motion.div
					className="text-center space-y-2"
					{...fadeUp(0.2)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						pick your vibe
					</h2>
					<p className="text-sm text-muted-foreground">
						8 categories, {categories.length * 7}+ challenges and counting
					</p>
				</motion.div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
					{categories.map((cat, i) => {
						// const Icon = iconMap[cat.id];
						return (
							<motion.button
								key={cat.id}
								onClick={() =>
									generateForCategory(cat.id === "random" ? "random" : cat.id)
								}
								className={cn(
									"group relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200",
									"hover:scale-[1.03] active:scale-[0.97]",
									"shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
									"hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
									categoryBg[cat.id],
									categoryBorder[cat.id],
								)}
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: 0.25 + i * 0.04,
									ease: [0.16, 1, 0.3, 1],
								}}>
								<div className="flex items-center gap-2 mb-2.5">
									<span className="text-lg">{categoryEmoji[cat.id]}</span>
									<span className={cn("text-sm font-bold", cat.color)}>
										{cat.label}
									</span>
								</div>
								<p className="text-xs text-muted-foreground leading-relaxed">
									{categoryDescriptions[cat.id]}
								</p>
								<ArrowRight className="absolute bottom-4 right-4 size-4 text-muted-foreground/30 group-hover:text-foreground/40 transition-colors" />
							</motion.button>
						);
					})}
				</div>
			</section>

			{/* ── What makes Tiny different ── */}
			<section className="space-y-8">
				<motion.div
					className="text-center space-y-2"
					{...fadeUp(0.25)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						what makes Tiny different?
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
							className="p-6 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-transform"
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
			<section className="space-y-6">
				<motion.div
					className="text-center space-y-2"
					{...fadeUp(0.35)}>
					<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
						questions you might have
					</h2>
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
							a: "Currently 56+, organized across 8 categories. We add new ones regularly.",
						},
						{
							q: "Can I save challenges for later?",
							a: "Tiny remembers your history so you won't repeat challenges. Your progress is stored locally in your browser.",
						},
					].map((item, i) => (
						<motion.div
							key={item.q}
							className="p-5 bg-card rounded-2xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
							{...fadeUp(0.4 + i * 0.04)}>
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
				className="text-center space-y-5 py-10"
				{...fadeUp(0.45)}>
				<p className="text-sm text-muted-foreground">
					So, what are you waiting for?
				</p>
				<Link
					to="/"
					className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold text-base rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 shadow-lg">
					<Zap className="size-5" />
					Try Tiny now
				</Link>
			</motion.section>

			{/* ── Footer ── */}
			<motion.footer
				className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border"
				{...fadeUp(0.5)}>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span className="font-bold text-foreground text-sm">Tiny</span>
					<span>·</span>
					<span>no login · no data · just vibes</span>
				</div>
				<div className="flex items-center gap-3 text-xs text-muted-foreground">
					<span className="flex items-center gap-1">
						made with <Heart className="size-3 text-rose-500 fill-rose-500" />{" "}
						and caffeine
					</span>
				</div>
			</motion.footer>
		</main>
	);
}
