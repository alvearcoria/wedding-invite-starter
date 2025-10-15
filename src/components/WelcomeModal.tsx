
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
    // Si la música está habilitada, mostramos el modal.
    if (siteConfig.sections.music) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    // Efecto para bloquear el scroll del body cuando el modal está visible.
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Función de limpieza para restaurar el scroll si el componente se desmonta.
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  const handleEnter = () => {
    // Despacha el evento para que el componente de música lo reproduzca.
    window.dispatchEvent(new CustomEvent("playAudio"));
    
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // Coincide con la duración de la animación de salida.
  };

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
        <Button onClick={handleEnter} size="lg" className="shadow-lg">
          <Music className="mr-2 h-5 w-5" />
          Entrar con música
        </Button>
      </div>
    </div>
  );
}
