import { useAppStore } from "@/stores/use-app-store";
import { cn } from "cn";
import { CloudRain, Music, Zap } from "lucide-react";
import { useCallback } from "react";
import type { Station } from "@/lib/music";

const stations: { id: Station; label: string; emoji: string; icon: typeof Music }[] = [
	{ id: "lofi", label: "Lo-fi", emoji: "🎵", icon: Music },
	{ id: "rain", label: "Rain", emoji: "🌧️", icon: CloudRain },
	{ id: "focus", label: "Focus", emoji: "🧠", icon: Zap },
];

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
				<Music className="size-4 text-muted-foreground" />
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
			<div className="grid grid-cols-3 gap-2">
				{stations.map((s) => {
					const isActive = musicStation === s.id && musicPlaying;
					return (
						<button
							key={s.id}
							onClick={() => handleStation(s.id)}
							className={cn(
								"flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl font-medium text-xs cursor-pointer",
								"transition-all duration-200 border-2",
								isActive
									? "border-primary bg-primary/10 text-primary scale-[1.03]"
									: "border-border text-muted-foreground hover:bg-secondary hover:border-foreground/15",
							)}>
							<span className="text-lg">{s.emoji}</span>
							{s.label}
						</button>
					);
				})}
			</div>
		</div>
	);
}
