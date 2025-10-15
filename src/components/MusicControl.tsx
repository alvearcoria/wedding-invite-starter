
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

  // Initialize audio element
  useEffect(() => {
    if (siteConfig.sections.music && !audioRef.current) {
      const audio = new Audio(siteConfig.musicUrl);
      audio.loop = true;
      audio.oncanplaythrough = () => setIsReady(true);
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, []);

  // Autoplay on first user interaction
  useEffect(() => {
    if (!isReady || !audioRef.current) return;

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
      // Remove listener after first interaction to avoid multiple plays
      window.removeEventListener('click', handleFirstInteraction, { capture: true });
    };

    window.addEventListener('click', handleFirstInteraction, { capture: true, once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction, { capture: true });
    };
  }, [isReady]);

  const toggleMusic = () => {
    if (!isReady || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
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
          "rounded-full shadow-lg",
          isPlaying && "animate-pulse"
        )}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Icon name="music" className="h-5 w-5" /> : <Icon name="music-2" className="h-5 w-5" />}
      </Button>
    </div>
  );
}
