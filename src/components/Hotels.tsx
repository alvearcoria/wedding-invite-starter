import { Hotel, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";

export function Hotels() {
  const { hotels } = siteConfig;

  if (!hotels || hotels.length === 0) return null;

  return (
    <SectionWrapper id="hotels" bgClass="bg-card">
      <SectionHeader
        title="Opciones de Hospedaje"
        description="Si vienes de fuera, aquí te dejamos algunas recomendaciones cercanas."
      />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, index) => (
          <Card key={index}>
            <CardHeader>
                <Hotel className="mb-2 h-8 w-8 text-accent-foreground" />
                <CardTitle className="font-headline">{hotel.name}</CardTitle>
                <CardDescription>{hotel.distance}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {hotel.tel !== 'N/A' && (
                <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${hotel.tel}`}>
                        <Phone className="mr-2"/>
                        {hotel.tel}
                    </a>
                </Button>
              )}
               <Button variant="outline" size="sm" asChild>
                <a href={hotel.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2"/>
                    Ver en mapa
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
