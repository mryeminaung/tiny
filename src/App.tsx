import { Navigation } from "@/components/Navigation";
import { Outlet } from "react-router";

function App() {
	return (
		<div className="min-h-dvh bg-background">
			<Navigation />
			<div className="animate-fade-in sm:pt-6 pt-4 sm:pb-0 pb-20">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
