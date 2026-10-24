import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/use-auth-store";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function LoginPage() {
	const navigate = useNavigate();
	const login = useAuthStore((s) => s.login);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		// Simulate network delay
		setTimeout(() => {
			const result = login(email, password);
			if (result.success) {
				navigate("/");
			} else {
				setError(result.error || "Login failed");
			}
			setLoading(false);
		}, 400);
	};

	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Tiny account</p>
				<h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
					Welcome back
				</h1>
				<p className="text-sm text-muted-foreground">
					Log in to pick up where you left off
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				{error && (
					<div role="alert" className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
						{error}
					</div>
				)}

				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-semibold text-foreground">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="you@example.com"
						required
						className="min-h-12 w-full rounded-xl border border-border/70 bg-background/45 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
					/>
				</div>

				<div className="space-y-2">
					<label
						htmlFor="password"
						className="text-sm font-semibold text-foreground">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="min-h-12 w-full rounded-xl border border-border/70 bg-background/45 px-3.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
							{showPassword ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</button>
					</div>
				</div>

				<Button
					type="submit"
					disabled={loading}
					className="min-h-12 w-full rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50">
					{loading ? (
						<span className="flex items-center gap-2">
							<span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
							Logging in...
						</span>
					) : (
						<span className="flex items-center gap-2">
							<LogIn className="size-4" />
							Log in
						</span>
					)}
				</Button>
			</form>

			<p className="text-center text-xs text-muted-foreground">
				Don't have an account?{" "}
				<Link
					to="/auth/register"
					className="font-semibold text-primary hover:underline underline-offset-2">
					Create one
				</Link>
			</p>
		</div>
	);
}
