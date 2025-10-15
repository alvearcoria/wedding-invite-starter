
import Image from "next/image";
import { MapPin, Church, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import MapWrapper from "./Map";

export function Venues() {
  const { ceremony, reception } = siteConfig.venues;
  
  return (
    <SectionWrapper id="venues" bgClass="bg-card">
      <SectionHeader
        title="Ceremonia y Recepción"
        description="Encuentra el camino a nuestra celebración. ¡Estamos ansiosos por verte allí!"
      />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        
        {/* Card de Ceremonia */}
        <Card className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={siteConfig.seeYouImage.src}
                    alt="Fondo decorativo para la ceremonia"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/70" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground p-4">
                    <Church className="h-10 w-10 mb-2" />
                    <CardTitle className="font-headline text-2xl">La Ceremonia</CardTitle>
                    <CardDescription className="text-primary-foreground/80">{ceremony.name}</CardDescription>
                </div>
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-grow">
                    <MapWrapper location={ceremony.location} name={ceremony.name} />
                    <p className="mt-4 text-center text-sm text-foreground/70">{ceremony.address}</p>
                </div>
                <Button variant="outline" asChild className="mt-4 w-full">
                <a href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Abrir en Mapas
                </a>
                </Button>
            </CardContent>
        </Card>

        {/* Card de Recepción */}
        <Card className="flex flex-col overflow-hidden">
             <div className="relative h-48 w-full">
                <Image
                    src={siteConfig.seeYouImage.src}
                    alt="Fondo decorativo para la recepción"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/70" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground p-4">
                    <Bell className="h-10 w-10 mb-2" />
                    <CardTitle className="font-headline text-2xl">La Recepción</CardTitle>
                    <CardDescription className="text-primary-foreground/80">{reception.name}</CardDescription>
                </div>
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-grow">
                <MapWrapper location={reception.location} name={reception.name} />
                <p className="mt-4 text-center text-sm text-foreground/70">{reception.address}</p>
                </div>
                <Button variant="outline" asChild className="mt-4 w-full">
                <a href={reception.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Abrir en Mapas
                </a>
                </Button>
            </CardContent>
        </Card>

      </div>
    </SectionWrapper>
  );
}
