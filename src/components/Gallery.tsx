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

export function Gallery() {
  return (
    <SectionWrapper id="gallery">
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
      </div>
    </SectionWrapper>
  );
}
