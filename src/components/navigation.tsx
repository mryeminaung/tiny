import { cn } from "@/lib/utils";
import { ThemePicker } from "@/components/theme-picker";
import { Bookmark, Clock, Home, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

const navLinks = [
	{ to: "/", label: "Home", icon: Home },
	{ to: "/challenges", label: "Challenges", icon: Sparkles },
	{ to: "/favorites", label: "Saved", icon: Bookmark },
	{ to: "/history", label: "History", icon: Clock },
];

export function Navigation() {
	return (
		<>
			{/* Desktop / Tablet top nav */}
			<header className="hidden sm:block sticky top-4 z-50 mx-auto max-w-6xl px-6">
				<nav className="glass relative h-16 flex items-center justify-between px-5 rounded-full overflow-visible">
					<NavLink
						to="/"
						className="flex items-center">
						<img
							src="/logo.png"
							alt="Tiny"
							className="h-20 w-auto -my-3"
						/>
					</NavLink>

					<div className="flex items-center gap-1">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									cn(
										"font-display px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
									isActive
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:text-foreground hover:bg-white/35",
									)
								}>
								{link.label}
							</NavLink>
						))}
						<ThemePicker />
					</div>
				</nav>
			</header>

			{/* Mobile bottom tab bar */}
			<nav className="sm:hidden fixed bottom-3 inset-x-4 z-50 safe-area-pb">
				<div className="glass-subtle relative rounded-2xl p-2 shadow-xl shadow-violet-900/10">
					<div className="absolute -top-14 right-1">
						<ThemePicker menuPosition="up" />
					</div>
					<div className="flex items-center justify-between gap-1">
					{navLinks.map((link) => {
						const Icon = link.icon;
						return (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									cn(
										"flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 transition-all duration-200",
										isActive
											? "bg-primary/12 text-primary"
											: "text-muted-foreground hover:bg-white/30 hover:text-foreground",
									)
								}>
								{({ isActive }) => (
									<>
										<Icon
											className={cn(
													"size-5 shrink-0 transition-all duration-200",
												isActive && "scale-110",
											)}
											strokeWidth={isActive ? 2.5 : 1.8}
										/>
										<span className={cn("font-display text-[10px] font-semibold", !isActive && "sr-only")}>
											{link.label}
										</span>
									</>
								)}
							</NavLink>
						);
					})}
					</div>
				</div>
			</nav>
		</>
	);
}
