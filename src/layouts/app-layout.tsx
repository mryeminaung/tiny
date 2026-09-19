import { BackgroundEffects } from "@/components/background-effects";
import { Navigation } from "@/components/navigation";
import { useAppStore } from "@/stores/use-app-store";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

function App() {
	const location = useLocation();
	const theme = useAppStore((s) => s.theme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	return (
		<div className="relative min-h-dvh">
			<BackgroundEffects />
			<Navigation />
			<motion.div
				key={location.pathname}
				className="sm:pt-6 pt-4 sm:pb-0 pb-20"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
				<Outlet />
			</motion.div>
		</div>
	);
}

export default App;
