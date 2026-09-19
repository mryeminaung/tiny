import { useStore } from "@/lib/store";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { HistoryPage } from "@/components/HistoryPage";
import { AboutPage } from "@/components/AboutPage";

function App() {
  const page = useStore((s) => s.page);

  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <Navigation />

      {page === "home" && <HomePage />}
      {page === "history" && <HistoryPage />}
      {page === "about" && <AboutPage />}
    </div>
  );
}

export default App;
