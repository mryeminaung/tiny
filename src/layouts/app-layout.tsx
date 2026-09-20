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
			<div className="relative z-10">
				<Navigation />
				<motion.div
					key={location.pathname}
					className="sm:pt-6 pt-4 sm:pb-0 pb-20"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
					<Outlet />
				</motion.div>
				<Footer />
			</div>
		</div>
	);
}

export default App;
