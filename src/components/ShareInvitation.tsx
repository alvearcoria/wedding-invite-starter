
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "./SectionWrapper";
import { Button } from "./ui/button";
import { Link, Share2 } from "lucide-react";
import { CopyToClipboard } from "./CopyToClipboard";
import { Whatsapp } from "./icons/Whatsapp";

export function ShareInvitation() {
  if (!siteConfig.siteUrl) return null;

  const whatsappMessage = encodeURIComponent(`${siteConfig.share.whatsappMessage} ${siteConfig.siteUrl}`);
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <SectionWrapper id="share" className="bg-background py-16 md:py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-6 rounded-lg bg-card p-8 text-center shadow-md">
        <Share2 className="h-8 w-8 text-primary" />
        <h3 className="font-headline text-2xl font-semibold">Comparte Nuestra Alegría</h3>
        <p className="text-sm text-foreground/70">
            Ayúdanos a compartir esta invitación con nuestros seres queridos.
        </p>
        
        <div className="flex w-full flex-col gap-4">
            <Button asChild size="lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Whatsapp className="mr-2 h-5 w-5" />
                    Compartir por WhatsApp
                </a>
            </Button>
            
            <div className="flex items-center gap-2 rounded-md border bg-background p-2 shadow-inner">
                <Link className="h-4 w-4 text-muted-foreground" />
                <p className="flex-1 truncate text-left text-sm text-foreground/80">{siteConfig.siteUrl}</p>
                <CopyToClipboard textToCopy={siteConfig.siteUrl} />
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
