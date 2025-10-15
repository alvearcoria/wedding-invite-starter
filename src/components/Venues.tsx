
import { MapPin, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import MapWrapper from "./Map";
import { Bell } from "lucide-react";

export function Venues() {
  const { ceremony, reception } = siteConfig.venues;
  return (
    <SectionWrapper id="venues" className="bg-card py-16 md:py-24 lg:py-32">
      <SectionHeader
        title="Ceremonia y Recepción"
        description="Encuentra el camino a nuestra celebración. ¡Estamos ansiosos por verte allí!"
      />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="items-center text-center">
            <Church className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-2xl">La Ceremonia</CardTitle>
            <CardDescription>{ceremony.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
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
        <Card className="flex flex-col">
          <CardHeader className="items-center text-center">
            <Bell className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-2xl">La Recepción</CardTitle>
            <CardDescription>{reception.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between">
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
