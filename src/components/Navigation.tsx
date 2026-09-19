import { useStore, type Page } from "@/lib/store";
import { cn } from "cn";

const navLinks: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "history", label: "History" },
  { id: "about", label: "About" },
];

export function Navigation() {
  const page = useStore((s) => s.page);
  const setPage = useStore((s) => s.setPage);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <nav className="mx-auto max-w-3xl px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            Tiny
          </span>
          <span className="text-[10px] font-medium text-[var(--muted-foreground)] bg-[var(--secondary)] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            ✨
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                page === link.id
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer",
                page === link.id
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
