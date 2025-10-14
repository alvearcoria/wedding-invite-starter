
import { Hash, Camera } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { CopyButton } from "./CopyButton";
import QrCode from "./QrCode";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export function ShareAndConnect() {
  const { hashtag, qrAlbum } = siteConfig;

  const showHashtag = !!hashtag;
  const showQr = !!qrAlbum?.url;

  if (!showHashtag && !showQr) {
    return null;
  }

  const gridCols = showHashtag && showQr ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <SectionWrapper id="share-connect" className="py-16 md:py-24 lg:py-32">
      <SectionHeader
        title="Comparte y Conecta"
        description="Ayúdanos a capturar cada momento y a compartir la alegría en redes sociales."
      />
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden bg-background shadow-lg">
          <div className={`grid grid-cols-1 ${gridCols}`}>
            
            {showHashtag && (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <Hash className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-2xl font-semibold">En Redes Sociales</h3>
                <p className="text-foreground/70">
                  Usa nuestro hashtag para que no nos perdamos ninguna de tus publicaciones.
                </p>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-inner">
                  <span className="font-mono text-lg font-medium text-accent-foreground">
                    {hashtag}
                  </span>
                  <CopyButton textToCopy={hashtag} />
                </div>
              </div>
            )}

            {showHashtag && showQr && <Separator className="md:hidden" />}
            
            {showQr && (
              <div className="flex flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-border/50 p-8 text-center">
                 <Camera className="h-10 w-10 text-primary" />
                <h3 className="font-headline text-2xl font-semibold">Nuestro Álbum</h3>
                <p className="text-foreground/70">
                  Escanea el código para subir tus fotos y videos a nuestro álbum compartido.
                </p>
                {qrAlbum.url && (
                  <a href={qrAlbum.url} target="_blank" rel="noopener noreferrer">
                    <QrCode value={qrAlbum.url} />
                  </a>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
}
