
'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionWrapper, SectionHeader } from './SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';

export function Gallery() {
  const { galleryImages } = siteConfig;

  return (
    <SectionWrapper id="gallery" bgClass="bg-background-transparent">
      <SectionHeader
        title="Nuestros Momentos"
        description="Un vistazo a nuestro viaje juntos. ¡Ayúdanos a llenarlo de nuevos recuerdos en el día de la boda!"
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
            {galleryImages.map((image, index) => (
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
