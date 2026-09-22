import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	createdAt: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => { success: boolean; error?: string };
	register: (name: string, email: string, password: string) => { success: boolean; error?: string };
	logout: () => void;
}

// Simple hash for demo (not secure — just for localStorage demo)
function simpleHash(str: string): string {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
	}
	return Math.abs(hash).toString(36);
}

interface StoredUser {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	createdAt: string;
}

function getStoredUsers(): StoredUser[] {
	try {
		return JSON.parse(localStorage.getItem("tiny-users") || "[]");
	} catch {
		return [];
	}
}

function saveStoredUsers(users: StoredUser[]) {
	localStorage.setItem("tiny-users", JSON.stringify(users));
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,

			login: (email, password) => {
				const users = getStoredUsers();
				const found = users.find(
					(u) => u.email.toLowerCase() === email.toLowerCase(),
				);

				if (!found) {
					return { success: false, error: "No account found with this email" };
				}

				if (found.passwordHash !== simpleHash(password)) {
					return { success: false, error: "Incorrect password" };
				}

				const user: User = {
					id: found.id,
					name: found.name,
					email: found.email,
					createdAt: found.createdAt,
				};

				set({ user, isAuthenticated: true });
				return { success: true };
			},

			register: (name, email, password) => {
				const users = getStoredUsers();

				if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
					return { success: false, error: "An account with this email already exists" };
				}

				if (password.length < 6) {
					return { success: false, error: "Password must be at least 6 characters" };
				}

				if (name.trim().length < 2) {
					return { success: false, error: "Name must be at least 2 characters" };
				}

				const newUser: StoredUser = {
					id: crypto.randomUUID(),
					name: name.trim(),
					email: email.trim().toLowerCase(),
					passwordHash: simpleHash(password),
					createdAt: new Date().toISOString(),
				};

				users.push(newUser);
				saveStoredUsers(users);

				const user: User = {
					id: newUser.id,
					name: newUser.name,
					email: newUser.email,
					createdAt: newUser.createdAt,
				};

				set({ user, isAuthenticated: true });
				return { success: true };
			},

			logout: () => {
				set({ user: null, isAuthenticated: false });
			},
		}),
		{
			name: "tiny-auth",
			partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
		},
	),
);
