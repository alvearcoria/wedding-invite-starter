"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Music, VolumeX } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show the modal only if music is enabled and it hasn't been closed in this session.
    if (siteConfig.sections.music && sessionStorage.getItem('welcomeModalClosed') !== 'true') {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Block body scroll when the modal is visible.
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to ensure scroll is re-enabled when the component unmounts.
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsFadingOut(true);
    sessionStorage.setItem('welcomeModalClosed', 'true');
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Wait for fade-out animation to complete.
  }

  const handleEnterWithMusic = () => {
    // Dispatch a global event that MusicControl will listen for.
    window.dispatchEvent(new CustomEvent("playAudio"));
    handleClose();
  };
  
  const handleEnterWithoutMusic = () => {
    handleClose();
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[101] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className={cn(
          "flex max-w-sm flex-col items-center gap-6 rounded-lg border bg-card/80 p-8 text-center text-foreground shadow-2xl transition-all duration-500 ease-out",
          isVisible && !isFadingOut ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <h2 className="font-headline text-5xl">
          {siteConfig.couple.her} & {siteConfig.couple.him}
        </h2>
        <p className="text-muted-foreground">
          Para una mejor experiencia, te recomendamos disfrutar de la música que hemos seleccionado para ti.
        </p>
        <div className="flex w-full flex-col gap-3">
            <Button onClick={handleEnterWithMusic} size="lg" className="shadow-lg">
                <Music className="mr-2 h-5 w-5" />
                Entrar con música
            </Button>
             <Button onClick={handleEnterWithoutMusic} variant="ghost" size="sm">
                <VolumeX className="mr-2 h-4 w-4" />
                Continuar sin música
            </Button>
        </div>
      </div>
    </div>
  );
}
