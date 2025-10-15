
"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Heart } from "@/components/icons/Heart";
import { cn } from "@/lib/utils";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Only show the modal if music is enabled and it hasn't been shown in this session
    if (siteConfig.sections.music && sessionStorage.getItem("welcomeModalShown") !== "true") {
      setIsOpen(true);
      document.body.style.overflow = "hidden"; // Block scroll
    }
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    document.body.style.overflow = ""; // Unblock scroll
    sessionStorage.setItem("welcomeModalShown", "true");
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // Wait for fade-out animation
  };

  const handleEnterWithMusic = () => {
    window.dispatchEvent(new CustomEvent("playAudio"));
    closeModal();
  };

  const handleEnterWithoutMusic = () => {
    closeModal();
  };

  if (!isOpen || !siteConfig.sections.music) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity duration-500",
        isClosing ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center text-center p-8">
        <Heart className="h-12 w-12 text-primary mb-4" />
        <h2 className="font-headline text-3xl md:text-4xl text-foreground">
          {siteConfig.couple.her} & {siteConfig.couple.him}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          ¿Deseas disfrutar de una experiencia musical mientras navegas?
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button onClick={handleEnterWithMusic} size="lg">
            Entrar con música
          </Button>
          <Button onClick={handleEnterWithoutMusic} variant="ghost" size="lg">
            Continuar sin música
          </Button>
        </div>
      </div>
    </div>
  );
}
