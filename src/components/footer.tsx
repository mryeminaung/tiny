export function Footer() {
	return (
		<footer className="relative z-10 mt-8 border-t border-border/50 bg-background/30 backdrop-blur-sm">
			<div className="mx-auto max-w-6xl px-6 pb-24 pt-6 text-center text-xs text-muted-foreground sm:px-16 sm:pb-6">
				© {new Date().getFullYear()} Made with by{" "}
				<a
					href="https://github.com/mryeminaung"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold text-foreground/70 underline decoration-foreground/20 underline-offset-2 transition-colors hover:text-foreground">
					Ye Min Aung
				</a>
			</div>
		</footer>
	);
}
