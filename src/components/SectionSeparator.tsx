
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  waveColor?: string;
  bgColor?: string;
}

export function SectionSeparator({ waveColor = 'fill-background', bgColor = 'bg-transparent' }: SectionSeparatorProps) {
  return (
    <div className={cn("relative -mb-1 w-full", bgColor)}>
      <svg
        className={cn("w-full h-auto", waveColor)}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1440,100C1200,100,960,0,720,0S240,100,0,100V100H1440Z" />
      </svg>
    </div>
  );
}
