"use client";

import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { IconName, Icon } from "@/components/icons";

type TimelineEvent = (typeof siteConfig.timelineEvents)[0];

const TimelineItem = ({
  item,
  index,
  isActive,
  inView,
}: {
  item: TimelineEvent;
  index: number;
  isActive: boolean;
  inView: boolean;
}) => {
  const isEven = index % 2 === 0;
  const iconName = item.icon as IconName;

  return (
    <div
      className={cn(
        "relative flex items-center",
        // Esto añade el data-index que usaremos para el observador
        `[data-index="${index}"]`
      )}
    >
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
            "font-headline text-xl transition-colors font-bold",
            isActive && "text-primary"
          )}
        >
          {item.event}
        </h3>
        <p
          className={cn(
            "text-sm transition-colors text-foreground/70",
            isActive && "text-foreground"
          )}
        >
          {item.description}
        </p>
      </div>

      {/* Ícono */}
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

      {/* Separador invisible para layout */}
      <div className={cn("w-1/2", isEven ? "pl-8" : "pr-8")} />
    </div>
  );
};

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timelineNode = timelineRef.current;
    if (!timelineNode) return;

    const items = Array.from(timelineNode.querySelectorAll("[data-index]"));
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          // Para la animación de entrada
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => new Set(prev).add(index));
          } else {
             setVisibleIndexes((prev) => {
               const newSet = new Set(prev);
               newSet.delete(index);
               return newSet;
             });
          }

          // Para la barra activa y la línea
          if (entry.intersectionRatio > 0.5) {
            setActiveIndex(index);
            
            // Calcular la altura de la línea
            const itemTop = (entry.target as HTMLElement).offsetTop;
            const itemHeight = entry.target.clientHeight;
            const newHeight = itemTop + itemHeight / 2;
            setLineHeight(newHeight);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.6], // Umbrales para inView y active
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div ref={timelineRef} className="relative mx-auto max-w-2xl">
        {/* Línea vertical estática de fondo */}
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
          aria-hidden="true"
        />
        {/* Línea vertical animada */}
        <div
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-primary transition-all duration-500 ease-out"
          style={{ height: `${lineHeight}px` }}
          aria-hidden="true"
        />

        <div className="space-y-8">
          {siteConfig.timelineEvents.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              inView={visibleIndexes.has(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
