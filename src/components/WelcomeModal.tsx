
"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Music } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const isModalAlreadyShown = sessionStorage.getItem("welcomeModalShown") === "true";
    if (siteConfig.sections.music && !isModalAlreadyShown) {
      // Forzar la entrada automáticamente para desarrollo
      handleEnter();
    }
  }, []);

  const handleEnter = () => {
    // Dispatch a custom event to tell the MusicControl component to play
    window.dispatchEvent(new CustomEvent("playAudio"));
    
    sessionStorage.setItem("welcomeModalShown", "true");
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Match fade-out duration
  };

  if (!isVisible || isFadingOut) { // Mantenerlo nulo mientras se desvanece
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[101] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center text-foreground animate-fade-in-up">
        <h2 className="font-headline text-4xl">
          {siteConfig.couple.her} & {siteConfig.couple.him}
        </h2>
        <p>Te recomendamos activar la música para una mejor experiencia.</p>
        <Button onClick={handleEnter} size="lg">
          <Music className="mr-2 h-5 w-5" />
          Entrar y activar música
        </Button>
      </div>
    </div>
  );
}
