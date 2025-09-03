import { siteConfig } from "@/config/site";
import { Heart } from "./icons/Heart";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-card">
      <div className="container mx-auto flex h-24 items-center justify-center px-4 text-center md:px-6">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Heart className="h-4 w-4" />
          <span>{siteConfig.couple.her} & {siteConfig.couple.him}</span>
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
