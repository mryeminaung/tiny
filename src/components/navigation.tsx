import { cn } from "@/lib/utils";
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
				<nav className="h-16 flex items-center justify-between px-5 bg-background/80 backdrop-blur-xl border border-border rounded-full shadow-sm overflow-hidden">
					<NavLink
						to="/"
						className="flex items-center">
						<img
							src="/logo.png"
							alt="Tiny"
							className="h-24 w-auto -my-3"
						/>
					</NavLink>

					<div className="flex items-center gap-1">
						{navLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									cn(
										"px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:text-foreground hover:bg-secondary",
									)
								}>
								{link.label}
							</NavLink>
						))}
					</div>
				</nav>
			</header>

			{/* Mobile bottom tab bar */}
			<nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border safe-area-pb">
				<div className="flex items-center justify-center h-16 px-2 gap-2">
					{navLinks.map((link) => {
						const Icon = link.icon;
						return (
							<NavLink
								key={link.to}
								to={link.to}
								className={({ isActive }) =>
									cn(
										"flex flex-col items-center gap-1 px-4 py-1.5 rounded-full transition-all duration-200 min-w-[56px]",
										isActive ? "text-primary" : "text-muted-foreground",
									)
								}>
								{({ isActive }) => (
									<>
										<Icon
											className={cn(
												"size-5 transition-all duration-200",
												isActive && "scale-110",
											)}
											strokeWidth={isActive ? 2.5 : 1.8}
										/>
										<span className="text-[10px] font-semibold">
											{link.label}
										</span>
									</>
								)}
							</NavLink>
						);
					})}
				</div>
			</nav>
		</>
	);
}
