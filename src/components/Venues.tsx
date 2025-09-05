
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import MapWrapper from "./Map";

export function Venues() {
  const { ceremony, reception } = siteConfig.venues;
  return (
    <SectionWrapper id="venues">
      <SectionHeader
        title="Ceremonia y Recepción"
        description="Encuentra el camino a nuestra celebración. ¡Estamos ansiosos por verte allí!"
      />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <MapWrapper location={ceremony.location} name={ceremony.name} />
          <CardHeader>
            <CardTitle className="font-headline text-2xl">La Ceremonia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">{ceremony.name}</p>
            <p className="text-foreground/70">{ceremony.address}</p>
            <Button variant="outline" asChild>
              <a href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" />
                Abrir en Mapas
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <MapWrapper location={reception.location} name={reception.name} />
          <CardHeader>
            <CardTitle className="font-headline text-2xl">La Recepción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">{reception.name}</p>
            <p className="text-foreground/70">{reception.address}</p>
            <Button variant="outline" asChild>
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
