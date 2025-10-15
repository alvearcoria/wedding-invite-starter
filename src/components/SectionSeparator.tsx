
import { cn } from "@/lib/utils";

interface SectionSeparatorProps {
  waveColor: string;
  className?: string;
}

export function SectionSeparator({ waveColor, className }: SectionSeparatorProps) {
  return (
    <div
      className={cn(
        "w-full h-16 md:h-20",
        waveColor,
        className
      )}
    >
      <div
        className="w-full h-full opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1rem 1rem, currentColor 0.25rem, transparent 0.25rem), radial-gradient(circle at 5rem 5rem, currentColor 0.25rem, transparent 0.25rem)",
          backgroundSize: "6.5rem 6.5rem",
        }}
      />
    </div>
  );
}
