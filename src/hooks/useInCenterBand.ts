"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Marca activo cuando el elemento entra a la "banda central" del viewport.
 * Se logra con rootMargin: -20% arriba y -20% abajo (queda una franja central del 60%).
 * Este margen más amplio ayuda a suavizar la transición entre elementos activos.
 */
export function useInCenterBand<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // El elemento está 'activo' si está intersectando la banda central definida.
        setActive(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0, // Se activa en cuanto toca la banda.
        // Margen superior e inferior del 20% para crear una banda de activación del 60% en el centro.
        // Esto previene cambios bruscos o parpadeos al hacer scroll.
        rootMargin: "-20% 0px -20% 0px",
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { centerRef: ref, active };
}
