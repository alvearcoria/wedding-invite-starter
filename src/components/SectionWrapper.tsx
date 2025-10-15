
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  bgClass?: string;
}

export function SectionWrapper({ id, children, className, bgClass = 'bg-background' }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative pt-12 md:pt-20 pb-0", bgClass, className)}>
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
    title: string;
    description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
    return (
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          {description && <p className="mt-4 text-lg text-foreground/70">{description}</p>}
        </div>
    );
}
