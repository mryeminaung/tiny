import { BackgroundEffects } from "@/components/background-effects";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { motion } from "motion/react";
import { Outlet, useLocation } from "react-router";

function App() {
	const location = useLocation();

	return (
		<div className="relative min-h-dvh">
			<BackgroundEffects />
			<Navigation />
			<main className="relative z-10 flex flex-col flex-1 mx-auto max-w-6xl px-6 pb-10 w-full">
				<motion.div
					key={location.pathname}
					className="sm:pt-6 pt-4"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
					<Outlet />
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
