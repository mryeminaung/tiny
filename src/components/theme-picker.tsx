import { cn } from "@/lib/utils";
import { applyTheme, useAppStore, type Theme } from "@/stores/use-app-store";
import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

const themes: { id: Theme; label: string; color: string }[] = [
	{ id: "lavender", label: "Lavender glass", color: "#a78bfa" },
	{ id: "sunset", label: "Sunset glass", color: "#f06b5b" },
	{ id: "ocean", label: "Ocean glass", color: "#1687c7" },
	{ id: "forest", label: "Forest glass", color: "#29956a" },
	{ id: "dark", label: "Dark glass", color: "#a78bfa" },
];

export function ThemePicker() {
	const storedTheme = useAppStore((s) => s.theme) as Theme | "light";
	const setTheme = useAppStore((s) => s.setTheme);
	const [open, setOpen] = useState(false);
	const theme: Theme = storedTheme === "light" ? "lavender" : storedTheme;

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	return (
		<div className="relative z-50">
			<button
				type="button"
				aria-label="Choose appearance theme"
				aria-expanded={open}
				onClick={() => setOpen((value) => !value)}
				className="flex size-11 items-center justify-center rounded-full text-muted-foreground hover:cursor-pointer transition-colors hover:bg-white/35 hover:text-foreground">
				<Palette
					className="size-4"
					aria-hidden="true"
				/>
			</button>

			{open && (
				<div
					role="menu"
					aria-label="Appearance themes"
					className="theme-picker-menu absolute right-0 top-13 z-50 w-52 rounded-2xl p-2 shadow-xl">
					<p className="px-3 py-2 text-xs font-semibold text-muted-foreground">
						Appearance
					</p>
					{themes.map((option) => (
						<button
							key={option.id}
							type="button"
							role="menuitemradio"
							aria-checked={theme === option.id}
							onClick={() => {
								setTheme(option.id);
								setOpen(false);
							}}
							className={cn(
								"flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:cursor-pointer transition-colors hover:bg-black/5 dark:hover:bg-white/10",
								theme === option.id && "bg-primary/10 text-primary",
							)}>
							<span
								className="size-3 rounded-full"
								style={{ background: option.color }}
								aria-hidden="true"
							/>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
