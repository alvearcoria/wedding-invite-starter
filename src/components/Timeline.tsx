"use client";

import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { IconName, Icon } from "@/components/icons";
import { useInCenterBand } from "@/hooks/useInCenterBand";
import { useInViewHalf } from "@/hooks/useInViewHalf";

type TimelineEvent = (typeof siteConfig.timelineEvents)[0];

const TimelineItem = ({
  item,
  index,
}: {
  item: TimelineEvent;
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const iconName = item.icon as IconName;

  // Hook para detectar si está en el centro (resaltado)
  const { centerRef, active: isActive } = useInCenterBand<HTMLDivElement>();
  // Hook para detectar si está visible (animación de entrada)
  const { ref: inViewRef, inView } = useInViewHalf<HTMLDivElement>();

  // Combinar las refs
  const combinedRef = (node: HTMLDivElement) => {
    centerRef.current = node;
    inViewRef.current = node;
  };

  return (
    <div ref={combinedRef} className="relative flex items-center">
      {/* --- Contenido del evento (Izquierda o Derecha) --- */}
      <div
        className={cn(
          "w-1/2 will-change-transform transition-all duration-700 ease-out",
          isEven ? "pr-8 text-right" : "pl-8 text-left order-last",
          inView
            ? "opacity-100 translate-x-0"
            : isEven
            ? "opacity-0 -translate-x-4"
            : "opacity-0 translate-x-4"
        )}
        style={{ transitionDelay: `${100 + index * 50}ms` }}
      >
        <p className="font-semibold">{item.time}</p>
        <h3
          className={cn(
            "font-headline text-xl transition-colors duration-300 font-bold",
            isActive && "text-primary"
          )}
        >
          {item.event}
        </h3>
        <p
          className={cn(
            "text-sm transition-colors duration-300 text-foreground/70",
            isActive && "text-foreground"
          )}
        >
          {item.description}
        </p>
      </div>

      {/* --- Ícono central --- */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
            isActive
              ? "bg-primary text-primary-foreground scale-110 shadow-lg ring-4 ring-primary/20"
              : "bg-accent text-accent-foreground scale-100"
          )}
        >
          <Icon name={iconName} className="h-6 w-6" />
        </div>
      </div>
      
      {/* Separador invisible para mantener el layout */}
      <div className={cn("w-1/2", isEven ? "pl-8" : "pr-8")} />
    </div>
  );
};


export function Timeline() {
  return (
    <>
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div className="relative mx-auto max-w-2xl">
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
            />
          ))}
        </div>
      </div>
    </>
  );
}
