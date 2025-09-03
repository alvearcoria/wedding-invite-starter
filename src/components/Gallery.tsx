import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import QrCode from "./QrCode";

export function Gallery() {
  return (
    <SectionWrapper id="gallery" className="bg-card">
      <SectionHeader
        title="Nuestros Momentos"
        description="Un vistazo a nuestro viaje juntos. Esperamos crear nuevos recuerdos con ustedes."
      />
      <div className="mx-auto max-w-5xl">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {siteConfig.galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-[3/4] items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        data-ai-hint={image.dataAiHint}
                        width={800}
                        height={1200}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>

        {siteConfig.collaborativeAlbum.enabled && (
            <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed border-border bg-background p-8 text-center">
                <h3 className="font-headline text-2xl font-semibold">¡Comparte Tus Fotos!</h3>
                <p className="max-w-md text-foreground/70">
                ¡Ayúdanos a capturar la alegría! Escanea el código QR para subir tus fotos y videos de nuestro día especial a nuestro álbum compartido.
                </p>
                <a href={siteConfig.collaborativeAlbum.url} target="_blank" rel="noopener noreferrer">
                    <QrCode value={siteConfig.collaborativeAlbum.url} />
                </a>
            </div>
        )}
      </div>
    </SectionWrapper>
  );
}
