"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Marca activo cuando el elemento entra a la "banda central" del viewport.
 * Se logra con rootMargin: -50% arriba y -50% abajo (define la línea central exacta).
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
        // Margen superior e inferior del 50% para crear una línea de activación en el centro exacto.
        rootMargin: "-50% 0px -50% 0px",
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { centerRef: ref, active };
}
