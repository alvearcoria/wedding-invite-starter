import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import MapWrapper from "./Map";

export function Venues() {
  return (
    <SectionWrapper id="venues">
      <SectionHeader
        title="Ceremonia y Recepción"
        description="Encuentra el camino a nuestra celebración. ¡Estamos ansiosos por verte allí!"
      />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <MapWrapper location={siteConfig.ceremony.location} name={siteConfig.ceremony.name} />
          <CardHeader>
            <CardTitle className="font-headline text-2xl">La Ceremonia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">{siteConfig.ceremony.name}</p>
            <p className="text-foreground/70">{siteConfig.ceremony.address}</p>
            <Button variant="outline" asChild>
              <a href={siteConfig.ceremony.mapsLink} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" />
                Abrir en Mapas
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <MapWrapper location={siteConfig.reception.location} name={siteConfig.reception.name} />
          <CardHeader>
            <CardTitle className="font-headline text-2xl">La Recepción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-semibold">{siteConfig.reception.name}</p>
            <p className="text-foreground/70">{siteConfig.reception.address}</p>
            <Button variant="outline" asChild>
              <a href={siteConfig.reception.mapsLink} target="_blank" rel="noopener noreferrer">
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
