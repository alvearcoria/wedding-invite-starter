"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Devuelve `true` cuando al menos el 20% del elemento es visible.
 * Por defecto (`once = false`), la animación es re-entrante, es decir,
 * se activa al entrar en vista (bajando) y se desactiva al salir (subiendo),
 * permitiendo que la animación se repita.
 */
export function useInViewHalf<T extends HTMLElement>(once = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Si el usuario prefiere movimiento reducido, activa la vista y no animes.
    if (isReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se considera "en vista" si al menos el 20% del elemento es visible.
        const isVisible = entry.intersectionRatio >= 0.2;
        
        setInView(isVisible);
        
        // Si la animación es de una sola vez y ya se activó, se deja de observar.
        if (once && isVisible) {
          observer.unobserve(el);
        }
      },
      {
        // Umbrales para que el observer se dispare al 0% y 20% de visibilidad.
        threshold: [0, 0.2],
        // Un pequeño margen para que la animación empiece un poco antes/después de que
        // el elemento toque el borde del viewport, resultando en una entrada más suave.
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    observer.observe(el);
    
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}
