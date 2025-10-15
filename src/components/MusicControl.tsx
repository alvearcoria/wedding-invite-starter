
"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (siteConfig.sections.music && !audioRef.current) {
      const audio = new Audio(siteConfig.musicUrl);
      audio.loop = true;
      audioRef.current = audio;
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
      }
    };

    const pauseAudio = () => {
       if (!audio.paused) {
         audio.pause();
         setIsPlaying(false);
       }
    };

    window.addEventListener("playAudio", playAudio);
    window.addEventListener("pauseAudio", pauseAudio);

    return () => {
      window.removeEventListener("playAudio", playAudio);
      window.removeEventListener("pauseAudio", pauseAudio);
    };
  }, [isReady]);

  const toggleMusic = () => {
    if (!isReady || !audioRef.current) return;
    
    if (isPlaying) {
      window.dispatchEvent(new CustomEvent("pauseAudio"));
    } else {
      window.dispatchEvent(new CustomEvent("playAudio"));
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
        {isPlaying ? <Music className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
      </Button>
    </div>
  );
}
