
import { siteConfig } from "@/config/site";
import { Heart } from "./icons/Heart";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-card">
      <div className="container mx-auto flex h-24 flex-col items-center justify-center gap-4 px-4 text-center md:h-auto md:flex-row md:justify-between md:px-6 md:py-6">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Heart className="h-4 w-4" />
          <span>{siteConfig.couple.her} & {siteConfig.couple.him}</span>
          <span>&copy; {currentYear}</span>
        </div>
        <div className="text-xs text-foreground/50">
          <span>Hecho con ❤️ por </span>
          <a
            href="https://www.linkedin.com/in/alexalvear/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-foreground/80"
          >
            AlexAlvear
          </a>
        </div>
      </div>
    </footer>
  );
}
