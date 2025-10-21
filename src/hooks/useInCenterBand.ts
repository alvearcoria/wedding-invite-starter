"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Marca activo cuando el elemento entra a la "banda central" del viewport (25% arriba, 25% abajo).
 * Se logra con rootMargin: -25% arriba y -25% abajo (queda una franja central del 50%).
 */
export function useInCenterBand<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting); // dentro de la banda central
      },
      {
        root: null,
        threshold: 0,                     // basta con tocar la banda
        rootMargin: "-25% 0px -25% 0px",  // 50% central del viewport
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { centerRef: ref, active };
}
