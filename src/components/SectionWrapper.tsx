import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgClass?: string;
  dividerColor?: string;
}

export function SectionWrapper({ id, children, className, bgClass = 'bg-background', dividerColor }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative", bgClass, className)}>
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        {children}
      </div>
      {dividerColor && (
         <svg
          className="pointer-events-none absolute -bottom-px left-0 h-12 w-full md:h-16"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,20 C240,90 1200,0 1440,60 L1440,100 L0,100 Z"
            style={{ fill: dividerColor }}
          />
        </svg>
      )}
    </section>
  );
}

interface SectionHeaderProps {
    title: string;
    description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
    return (
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          {description && <p className="mt-4 text-lg text-foreground/70">{description}</p>}
        </div>
    );
}
