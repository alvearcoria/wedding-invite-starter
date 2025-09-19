
import { siteConfig } from "@/config/site";
import QrCode from "./QrCode";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { Button } from "./ui/button";
import { Link, QrCodeIcon } from "lucide-react";
import { CopyButton } from "./CopyButton";

export function ShareInvitation() {
  if (!siteConfig.siteUrl) return null;

  return (
    <SectionWrapper id="share" className="bg-card">
      <SectionHeader
        title="Comparte Nuestra Alegría"
        description="Ayúdanos a compartir esta invitación con nuestros seres queridos."
      />
      <div className="mx-auto flex max-w-md flex-col items-center gap-8">
        <div className="rounded-lg border-2 border-dashed border-border bg-background p-6">
          <QrCode value={siteConfig.siteUrl} />
        </div>
        <div className="flex w-full flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">O copia y comparte el enlace:</p>
            <div className="flex items-center gap-2 rounded-md border bg-background p-2 shadow-inner">
                <Link className="h-4 w-4 text-muted-foreground" />
                <p className="flex-1 truncate text-left text-sm text-foreground/80">{siteConfig.siteUrl}</p>
                <CopyButton textToCopy={siteConfig.siteUrl} />
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
