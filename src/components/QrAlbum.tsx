import { siteConfig } from "@/config/site";
import QrCode from "./QrCode";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";

export function QrAlbum() {
  if (!siteConfig.qrAlbum.url) return null;

  return (
    <SectionWrapper id="qr-album" className="bg-card">
      <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed border-border bg-background p-8 text-center">
        <h3 className="font-headline text-2xl font-semibold">¡Comparte Tus Fotos!</h3>
        <p className="max-w-md text-foreground/70">
          ¡Ayúdanos a capturar la alegría! Escanea el código QR para subir tus fotos y videos de nuestro día especial a nuestro álbum compartido.
        </p>
        <a href={siteConfig.qrAlbum.url} target="_blank" rel="noopener noreferrer">
          <QrCode value={siteConfig.qrAlbum.url} />
        </a>
      </div>
    </SectionWrapper>
  );
}
