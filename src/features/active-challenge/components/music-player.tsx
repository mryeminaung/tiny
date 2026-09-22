import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/use-app-store";
import { Music, Volume2, VolumeX } from "lucide-react";
import { useCallback } from "react";
import { musicEngine, stations, type Station } from "@/lib/music";

export function MusicPlayer() {
	const musicPlaying = useAppStore((s) => s.musicPlaying);
	const musicStation = useAppStore((s) => s.musicStation);
	const setMusicStation = useAppStore((s) => s.setMusicStation);

	const handleStation = useCallback(
		(station: Station) => {
			if (musicStation === station && musicPlaying) {
				setMusicStation("none");
			} else {
				setMusicStation(station);
			}
		},
		[musicStation, musicPlaying, setMusicStation],
	);

	return (
		<div className="bg-card rounded-2xl border border-border p-4 space-y-3 shadow-sm">
			<div className="flex items-center gap-2">
				{musicPlaying ? (
					<Volume2 className="size-4 text-primary" />
				) : (
					<Music className="size-4 text-muted-foreground" />
				)}
				<span className="text-sm font-semibold text-foreground">
					Ambient Music
				</span>
				{musicPlaying && (
					<span className="relative flex size-2 ml-auto">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
						<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
					</span>
				)}
			</div>

			<div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
				{stations.map((s) => {
					const isActive = musicStation === s.id && musicPlaying;
					return (
						<button
							key={s.id}
							onClick={() => handleStation(s.id)}
							className={`group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
								isActive
									? "bg-primary/10 border-primary/30 shadow-sm scale-[1.04]"
									: "bg-muted/30 border-transparent hover:bg-muted/60 hover:border-border"
							}`}>
							<span className="text-xl leading-none">{s.emoji}</span>
							<span
								className={`text-[10px] font-semibold leading-tight ${
									isActive ? "text-primary" : "text-muted-foreground"
								}`}>
								{s.label}
							</span>
						</button>
					);
				})}

				{/* Stop button */}
				<button
					onClick={() => setMusicStation("none")}
					className={`group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
						!musicPlaying
							? "bg-muted/30 border-transparent"
							: "bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
					}`}>
					<VolumeX
						className={`size-5 ${
							musicPlaying ? "text-destructive" : "text-muted-foreground"
						}`}
					/>
					<span
						className={`text-[10px] font-semibold leading-tight ${
							musicPlaying ? "text-destructive" : "text-muted-foreground"
						}`}>
						Stop
					</span>
				</button>
			</div>
		</div>
	);
}
