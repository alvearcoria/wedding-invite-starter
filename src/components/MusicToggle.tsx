"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We need to create the audio element on the client side
    const audio = new Audio(siteConfig.musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    // Autoplay can be tricky, we start muted and let user interact
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Autoplay started!
        setIsPlaying(true);
      }).catch(error => {
        // Autoplay was prevented.
        console.log("Autoplay prevented");
        setIsPlaying(false);
      });
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMusic}
        className="rounded-full shadow-lg"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Music className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
      </Button>
    </div>
  );
}
