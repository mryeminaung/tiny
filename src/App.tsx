import { ActiveChallengePage } from "@/features/active-challenge";
import AppLayout from "@/layouts/app-layout";
import { HomePage, AboutPage, HistoryPage } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "active", element: <ActiveChallengePage /> },
			{ path: "history", element: <HistoryPage /> },
			{ path: "about", element: <AboutPage /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
