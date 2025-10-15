
"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";
import { Heart } from "./icons/Heart";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // sessionStorage.setItem("welcomeModalSeen", "true"); // DEBUG: Uncomment to prevent modal from showing
    const hasSeenModal = sessionStorage.getItem("welcomeModalSeen");
    if (!hasSeenModal && siteConfig.sections.music) {
      setIsOpen(true);
      document.body.classList.add("modal-open");
    }
  }, []);

  const closeModal = () => {
    sessionStorage.setItem("welcomeModalSeen", "true");
    setIsClosing(true);
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // Wait for fade-out animation to complete
  };

  const handleEnterWithMusic = () => {
    window.dispatchEvent(new CustomEvent("playAudio"));
    closeModal();
  };

  const handleEnterWithoutMusic = () => {
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500",
        isClosing ? "opacity-0" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-xl",
          "transition-opacity duration-500",
          isClosing ? "opacity-0" : "opacity-100"
        )}
      />
      <div
        className={cn(
          "relative mx-4 w-full max-w-md transform rounded-2xl border border-white/10 bg-transparent p-8 text-center text-white shadow-2xl transition-all duration-300",
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Heart className="mx-auto mb-4 h-10 w-10 text-white" />
        <h2 className="font-headline text-3xl md:text-4xl text-shadow-lg">
          {siteConfig.couple.her} & {siteConfig.couple.him}
        </h2>
        <p className="mt-4 text-lg text-white/80">
          ¿Deseas disfrutar de una experiencia musical mientras navegas?
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button onClick={handleEnterWithMusic} size="lg" className="w-full bg-white/90 text-primary hover:bg-white">
            Entrar con música
          </Button>
          <Button onClick={handleEnterWithoutMusic} variant="outline" size="lg" className="w-full border-white/50 text-white/80 hover:bg-white/10 hover:text-white">
            Continuar sin música
          </Button>
        </div>
      </div>
    </div>
  );
}
