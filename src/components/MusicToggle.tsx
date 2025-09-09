
"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We create the audio element only on the client side.
    const audio = new Audio(siteConfig.musicUrl);
    audio.loop = true;
    audioRef.current = audio;

    // Modern browsers block autoplay until the user interacts.
    // This function will attempt to play the audio after the first user interaction.
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          // Autoplay was still blocked, user will need to click the button.
          console.log("Autoplay was prevented by the browser.");
          setIsPlaying(false);
        });
      }
      // Remove the listener after the first use to avoid multiple triggers.
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Add listeners for the first interaction
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    
    // Cleanup function to pause audio and remove listeners when component unmounts.
    return () => {
      audioRef.current?.pause();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => console.error("Error playing audio:", error));
        }
        setIsPlaying(!isPlaying);
    }
  };

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
