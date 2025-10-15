
"use client";

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { cn } from "@/lib/utils";
import { siteConfig } from '@/config/site';
import { IconName, Icon } from '@/components/icons';

type TimelineEvent = (typeof siteConfig.timelineEvents)[0];

const TimelineItem = ({ item, index }: { item: TimelineEvent, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isEven = index % 2 === 0;

  const iconName = item.icon as IconName;

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
        "relative flex items-center",
      )}
    >
      <div
        className={cn(
          "w-1/2 transition-all duration-700 ease-in-out",
          isEven ? "pr-8 text-right" : "pl-8 text-left order-last",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0",
          isEven ? (isVisible ? "translate-x-0" : "-translate-x-4") : (isVisible ? "translate-x-0" : "translate-x-4")
        )}
      >
        <p className="font-semibold">{item.time}</p>
        <h3 className="font-headline text-xl font-bold">{item.event}</h3>
        <p className="text-sm text-foreground/70">{item.description}</p>
      </div>
      <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-all duration-500",
          isVisible ? "bg-primary text-primary-foreground scale-110" : "scale-90"
          )}>
          <Icon name={iconName} className="h-6 w-6" />
        </div>
      </div>
      {/* This empty div is just for spacing */}
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
