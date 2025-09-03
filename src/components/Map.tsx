"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MapWrapper = ({ location, name }: { location: { lat: number; lng: number }; name: string }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-muted text-center text-sm text-muted-foreground">
        Falta la clave de API de Google Maps. <br /> Agrégala a tus variables de entorno.
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="aspect-video w-full">
        <Map
          defaultCenter={location}
          defaultZoom={15}
          mapId="e2b2650c82de4d73"
          disableDefaultUI={true}
          gestureHandling="cooperative"
        >
          <AdvancedMarker position={location} title={name} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapWrapper;
