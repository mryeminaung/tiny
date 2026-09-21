import { ActiveChallengePage } from "@/features/active-challenge";
import AppLayout from "@/layouts/app-layout";
import { HomePage, ChallengesPage, HistoryPage, FavoritesPage, NotFoundPage } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "challenges", element: <ChallengesPage /> },
			{ path: "challenges/:challengeId/active", element: <ActiveChallengePage /> },
			{ path: "favorites", element: <FavoritesPage /> },
			{ path: "history", element: <HistoryPage /> },
			{ path: "*", element: <NotFoundPage /> },
		],
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
