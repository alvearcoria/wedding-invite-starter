
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  waveColor?: string;
  bgColor?: string;
  className?: string;
}

export function SectionSeparator({ 
    waveColor = 'fill-background', 
    bgColor = 'bg-transparent',
    className,
}: SectionSeparatorProps) {
  return (
    <div className={cn("w-full h-8 md:h-10 -mb-[1px]", bgColor, className)}>
      <div className="h-full w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("block h-full w-[calc(100%+1.3px)]", waveColor)}
        >
          <path d="M1200,50C1000,150,800,0,600,50C400,100,200,-50,0,50V100H1440V50H1200Z" />
        </svg>
      </div>
    </div>
  );
}
