
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  bgColor: string;
  waveColor: string;
  className?: string;
}

export function SectionSeparator({ bgColor, waveColor, className }: SectionSeparatorProps) {
  return (
    <div className={cn("relative h-16 md:h-20 w-full", bgColor, waveColor, className)}>
      <div className="absolute bottom-0 left-0 w-full h-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 C40,70 60,70 100,0 V100 H0Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
