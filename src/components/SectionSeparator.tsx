
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  waveColor?: string;
  className?: string;
}

export function SectionSeparator({ 
    waveColor = 'fill-background', 
    className,
}: SectionSeparatorProps) {
  return (
    <div className={cn("w-full h-12 md:h-16 -mb-px", className)}>
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("block h-full w-full", waveColor)}
        >
          <path d="M1440,0V100H0V0C240,60,480,100,720,100C960,100,1200,60,1440,0Z" />
        </svg>
    </div>
  );
}
