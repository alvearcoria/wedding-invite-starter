
import { siteConfig } from "@/config/site";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { CopyToClipboard } from "./CopyToClipboard";
//import QrCode from "./QrCode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "./icons";
import Image from "next/image";

export function ShareAndConnect() {
  const { hashtag, qrAlbum } = siteConfig;

  const showHashtag = !!hashtag;
  const showQr = !!qrAlbum?.url;

  if (!showHashtag && !showQr) {
    return null;
  }

  const gridCols = showHashtag && showQr ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <SectionWrapper id="share-connect" bgClass="bg-background-transparent">
      <SectionHeader
        title="Comparte y Conecta"
        description="Ayúdanos a capturar cada momento y a compartir la alegría en redes sociales."
      />
      <div className={`mx-auto grid max-w-4xl gap-8 ${gridCols}`}>
        {showHashtag && (
          <Card className="text-center">
            <CardHeader>
              <Icon name="hash" className="mx-auto h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-2xl font-semibold">En Redes Sociales</CardTitle>
              <CardDescription>
                Usa nuestro hashtag para que no nos perdamos ninguna de tus publicaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-inner">
                <span className="font-mono text-lg font-medium text-accent-foreground">
                  {hashtag}
                </span>
                <CopyToClipboard textToCopy={hashtag} />
              </div>
            </CardContent>
          </Card>
        )}
        
        {showQr && (
          <Card className="text-center">
            <CardHeader>
              <Icon name="camera" className="mx-auto h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-2xl font-semibold">Nuestro Álbum</CardTitle>
              <CardDescription>
                Escanea el código para subir tus fotos y videos a nuestro álbum compartido.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {qrAlbum.url && (
    <a href={qrAlbum.url} target="_blank" rel="noopener noreferrer" className="inline-block">
      <Image
        src="https://ik.imagekit.io/alvearcoria92/qr-code.png?updatedAt=1760728958018"
        alt="Código QR para el álbum de invitados"
        width={160} // El mismo tamaño que el QR actual
        height={160} // El mismo tamaño que el QR actual
        className="rounded-md"
      />
    </a>
  )}
            </CardContent>

          </Card>
        )}
      </div>
    </SectionWrapper>
  );
}
