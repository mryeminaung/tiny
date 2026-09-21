import { ActiveChallengePage } from "@/features/active-challenge";
import AppLayout from "@/layouts/app-layout";
import { HomePage, ChallengesPage, HistoryPage, FavoritesPage } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "challenges", element: <ChallengesPage /> },
			{ path: "active", element: <ActiveChallengePage /> },
			{ path: "favorites", element: <FavoritesPage /> },
			{ path: "history", element: <HistoryPage /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
