"use client";

import { useEffect, useRef } from 'react';
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { Church, Bell, GlassWater, PenSquare, Utensils, HeartHandshake, Music, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  { time: "4:30 PM", event: "Ceremonia", description: "Sean testigos de nuestros votos y el comienzo de nuestro para siempre.", icon: Church },
  { time: "6:00 PM", event: "Recepción", description: "Disfruten de la bienvenida.", icon: Bell },
  { time: "6:00 PM", event: "Cocktail", description: "Disfruten de bebidas y bocadillos.", icon: GlassWater },
  { time: "6:15 PM", event: "Boda Civil", description: "El momento legal de nuestra unión.", icon: PenSquare },
  { time: "8:00 PM", event: "Cena", description: "Acompáñennos para una deliciosa cena.", icon: Utensils },
  { time: "9:30 PM", event: "Primer Baile", description: "Nuestro primer baile como esposos.", icon: HeartHandshake },
  { time: "9:50 PM", event: "¡Fiesta!", description: "¡Vamos a la pista de baile!", icon: Music },
  { time: "12:30 AM", event: "Tornaboda", description: "Continuemos la celebración.", icon: Coffee },
];

const TimelineItem = ({ item, index }: { item: typeof timelineEvents[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      },
      {
        threshold: 0.5, // Se activa cuando el 50% del elemento es visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "timeline-item relative flex items-center transition-all duration-700 ease-out",
        "opacity-50 translate-y-4 scale-95", // Estado inicial
        "[&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:scale-100" // Estado visible
      )}
    >
      {/* Content Block */}
      <div
        className={cn(
          "w-1/2",
          isEven ? "pr-8 text-right" : "pl-8 text-left order-last"
        )}
      >
        <p className="font-semibold">{item.time}</p>
        <h3 className="font-headline text-xl font-bold">{item.event}</h3>
        <p className="text-sm text-foreground/70">{item.description}</p>
      </div>

      {/* Icon in the middle */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
        <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-accent transition-colors duration-500",
            "timeline-item-icon"
            )}>
          <item.icon className="h-6 w-6 text-accent-foreground" />
        </div>
      </div>

      {/* Empty spacer on the other side */}
      <div className={cn("w-1/2", isEven ? "pl-8" : "pr-8")} />
    </div>
  );
};


export function Timeline() {
  return (
    <SectionWrapper id="timeline" className="bg-card">
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div className="relative mx-auto max-w-2xl">
        {/* Usamos un pseudo-elemento para la línea, controlado por CSS */}
        <div 
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
          aria-hidden="true"
        />
        <div className="space-y-12">
          {timelineEvents.map((item, index) => (
             <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      <style jsx global>{`
        .timeline-item.is-visible .timeline-item-icon {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
        .timeline-item.is-visible .timeline-item-icon > svg {
            color: hsl(var(--primary-foreground));
        }
      `}</style>
    </SectionWrapper>
  );
}
