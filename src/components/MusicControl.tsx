
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

export function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element and event listeners
  useEffect(() => {
    if (!siteConfig.sections.music) return;

    const audio = new Audio(siteConfig.musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Custom event listeners
    const playAudio = () => {
        if (isReady) audio.play().catch(console.error);
    };
    const pauseAudio = () => audio.pause();

    window.addEventListener("playAudio" as any, playAudio);
    window.addEventListener("pauseAudio" as any, pauseAudio);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener("playAudio" as any, playAudio);
      window.removeEventListener("pauseAudio" as any, pauseAudio);
      audio.pause();
      audio.src = "";
    };
  }, [isReady]); // Rerunning this effect if isReady changes is fine and safe.

  const toggleMusic = () => {
    if (!audioRef.current || !isReady) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  if (!siteConfig.sections.music) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMusic}
        className={cn(
          "rounded-full shadow-lg transition-opacity",
          !isReady ? "opacity-0" : "opacity-100",
          isPlaying && "animate-pulse"
        )}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        disabled={!isReady}
      >
        {isPlaying ? <Icon name="music" className="h-5 w-5" /> : <Icon name="music-2" className="h-5 w-5" />}
      </Button>
    </div>
  );
}
