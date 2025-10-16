
'use client';

import Image from 'next/image';
import { useFirestore } from '@/firebase/provider';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { siteConfig } from '@/config/site';
import { useMemoFirebase } from '@/firebase/provider';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SectionWrapper, SectionHeader } from './SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Icon } from '@/components/icons';

type Photo = {
  downloadURL: string;
  caption?: string;
};

function GallerySkeleton() {
  return (
    <div className="mx-auto max-w-5xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="p-1">
            <Skeleton className="aspect-[3/4] w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const firestore = useFirestore();
  
  const photosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'invitations', siteConfig.slug, 'photos'),
      orderBy('uploadedAt', 'desc')
    );
  }, [firestore]);

  const { data: photos, isLoading, error } = useCollection<Photo>(photosQuery);
  
  const hasPhotos = photos && photos.length > 0;

  return (
    <SectionWrapper id="gallery" bgClass="bg-background-transparent">
      <SectionHeader
        title="Nuestros Momentos"
        description="Un vistazo a nuestro viaje juntos. ¡Ayúdanos a llenarlo de nuevos recuerdos!"
      />
      
      {isLoading && <GallerySkeleton />}
      
      {!isLoading && !hasPhotos && (
          <Card className="flex flex-col items-center justify-center h-80 border-dashed bg-card/50">
            <Icon name="camera" className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">¡Sé el primero en compartir!</p>
            <p className="text-muted-foreground text-sm">Escanea el código QR en la sección "Comparte y Conecta" para subir tus fotos.</p>
          </Card>
      )}

      {error && (
        <Card className="flex flex-col items-center justify-center h-80 border-dashed bg-destructive/10 text-destructive">
            <Icon name="frown" className="h-12 w-12" />
            <p className="mt-4 text-lg font-semibold">Error al cargar la galería</p>
            <p className="text-destructive/80 text-sm">No se pudieron cargar las fotos. Inténtalo de nuevo más tarde.</p>
        </Card>
      )}

      {!isLoading && hasPhotos && (
        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {photos.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="flex aspect-[3/4] items-center justify-center p-0">
                        <Image
                          src={image.downloadURL}
                          alt={image.caption || "Foto de la boda"}
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
      )}
    </SectionWrapper>
  );
}
