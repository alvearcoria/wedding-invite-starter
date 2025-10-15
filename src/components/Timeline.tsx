"use client";

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { Church, Bell, GlassWater, PenSquare, Utensils, HeartHandshake, Music, Coffee, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from '@/config/site';

const iconMap: { [key: string]: ComponentType<LucideProps> } = {
  Church,
  Bell,
  GlassWater,
  PenSquare,
  Utensils,
  HeartHandshake,
  Music,
  Coffee,
};

type TimelineEvent = (typeof siteConfig.timelineEvents)[0];

const TimelineItem = ({ item, index }: { item: TimelineEvent, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isEven = index % 2 === 0;

  const IconComponent = iconMap[item.icon];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5,
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
        "timeline-item relative flex items-center transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
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
      <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-500",
          isVisible && "bg-primary text-primary-foreground scale-110"
          )}>
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </div>
      </div>
      <div className={cn("w-1/2", isEven ? "pl-8" : "pr-8")} />
    </div>
  );
};


export function Timeline() {
  return (
    <SectionWrapper id="timeline" bgClass="bg-card">
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div className="relative mx-auto max-w-2xl">
        <div 
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
          aria-hidden="true"
        />
        <div className="space-y-12">
          {siteConfig.timelineEvents.map((item, index) => (
             <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
