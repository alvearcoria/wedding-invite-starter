"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "./SectionWrapper";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { IconName, Icon } from "@/components/icons";
import { useInViewHalf } from "@/hooks/useInViewHalf";
import { useInCenterBand } from "@/hooks/useInCenterBand";

type TimelineEvent = (typeof siteConfig.timelineEvents)[0];

const TimelineItem = ({
  item,
  index,
  onActiveChange,
  isGloballyActive,
}: {
  item: TimelineEvent;
  index: number;
  onActiveChange: (idx: number, active: boolean) => void;
  isGloballyActive: boolean;
}) => {
  const isEven = index % 2 === 0;
  const iconName = item.icon as IconName;

  // Aparición suave (>=50% del elemento)
  const { ref, inView } = useInViewHalf<HTMLDivElement>(false); // false => reversible al salir

  // Banda central (50% de pantalla) para "activo"
  const { centerRef, active } = useInCenterBand<HTMLDivElement>();
  
  useEffect(() => {
    onActiveChange(index, active);
  }, [active, index, onActiveChange]);


  return (
    <div className="relative flex items-center">
      {/* Anclaje invisible para la banda central (alineado al bloque del contenido) */}
      <div ref={centerRef} className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2" />

      <div
        ref={ref}
        className={cn(
          "w-1/2 will-change-transform transition-all duration-1000 ease-out",
          isEven ? "pr-8 text-right" : "pl-8 text-left order-last",
          // Aparición desde el lado correspondiente
          inView
            ? "opacity-100 translate-x-0"
            : isEven
            ? "opacity-0 -translate-x-6"
            : "opacity-0 translate-x-6"
        )}
        // Pequeño "stagger" por índice
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <p className="font-semibold">{item.time}</p>
        <h3
          className={cn(
            "font-headline text-xl transition-colors",
            isGloballyActive ? "text-primary font-semibold" : "font-bold"
          )}
        >
          {item.event}
        </h3>
        <p className={cn("text-sm transition-colors", isGloballyActive ? "text-foreground" : "text-foreground/70")}>
          {item.description}
        </p>
      </div>

      {/* Ícono */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
            isGloballyActive
              ? "bg-primary text-primary-foreground scale-110 shadow-lg ring-2 ring-primary/30"
              : "bg-accent text-accent-foreground scale-100"
          )}
          style={{ transitionDelay: `${index * 120 + 40}ms` }}
        >
          <Icon name={iconName} className="h-6 w-6" />
        </div>
      </div>

      {/* Separador invisible para layout */}
      <div className={cn("w-1/2", isEven ? "pl-8" : "pr-8")} />
    </div>
  );
};

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // controla cuál item es "globalmente activo" (en la banda central)
  const handleActiveChange = (idx: number, active: boolean) => {
    setActiveIndex((prev) => {
      if (active) return idx;
      return prev === idx ? null : prev;
    });
  };

  return (
    <>
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div className="relative mx-auto max-w-2xl">
        {/* línea vertical */}
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
          aria-hidden="true"
        />
        <div className="space-y-8">
          {siteConfig.timelineEvents.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              onActiveChange={handleActiveChange}
              isGloballyActive={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
