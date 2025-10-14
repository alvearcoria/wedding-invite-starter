
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  waveColor?: string;
  bgColor?: string;
  className?: string;
  flip?: boolean;
}

export function SectionSeparator({ 
    waveColor = 'fill-background', 
    bgColor = 'bg-transparent',
    className,
    flip = false,
}: SectionSeparatorProps) {
  return (
    <div className={cn("relative w-full h-8 md:h-10", bgColor, className)}>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("relative block h-[25px] w-[calc(100%+1.3px)] md:h-[40px]", waveColor, flip && "transform -scale-x-100")}
        >
          <path d="M1200,50C1000,150,800,0,600,50C400,100,200,-50,0,50V100H1440V50H1200Z" />
        </svg>
      </div>
    </div>
  );
}
