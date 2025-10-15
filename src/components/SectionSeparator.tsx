
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
    <div className={cn("relative h-16 md:h-24 w-full", className)}>
        <div className={cn("absolute bottom-0 left-0 w-full h-full", waveColor)}>
            <svg
              className="absolute bottom-0 left-0 w-full h-full"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1440,0V100H0V0C240,60,480,100,720,100C960,100,1200,60,1440,0Z" className="fill-inherit" />
            </svg>
        </div>
    </div>
  );
}
