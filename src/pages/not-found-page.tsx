import { motion } from "motion/react";

export function NotFoundPage() {
	return (
		<div className="min-h-[calc(80vh-120px)] flex items-center justify-center px-4">
			<motion.div
				className="text-center space-y-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
				<img
					src="/not-found.png"
					alt="404 — Page not found"
					className="w-full max-w-md mx-auto"
				/>
			</motion.div>
		</div>
	);
}
