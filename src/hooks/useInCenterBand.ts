"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Marca activo cuando el elemento entra a la "banda central" del viewport.
 * Se logra con rootMargin: -40% arriba y -40% abajo (queda una franja central del 20%).
 * Esta configuración es un balance entre precisión y fiabilidad para evitar que el navegador
 * se salte la detección durante scrolls rápidos.
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
        rootMargin: "-40% 0px -40% 0px",
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { centerRef: ref, active };
}
