"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Devuelve true cuando >=50% del elemento es visible (aparece/oculta).
 * Solo activa una vez por defecto (once=true).
 */
export function useInViewHalf<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        const on = entry.intersectionRatio >= 0.5; // >=50% del elemento
        if (on) {
          setInView(true);
          if (once && !hasTriggered.current) {
            hasTriggered.current = true;
            obs.unobserve(entry.target);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return { ref, inView };
}
