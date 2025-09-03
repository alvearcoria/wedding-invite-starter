import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { Cake, Camera, GlassWater, Music, HeartHandshake } from "lucide-react";

const timelineEvents = [
  { time: "4:00 PM", event: "Ceremonia", description: "Sean testigos de nuestros votos y el comienzo de nuestro para siempre.", icon: HeartHandshake },
  { time: "5:00 PM", event: "Hora del Cóctel", description: "Disfruten de bebidas y bocadillos mientras nos tomamos fotos.", icon: GlassWater },
  { time: "6:30 PM", event: "Recepción", description: "Acompáñennos para la cena y los brindis.", icon: Camera },
  { time: "8:00 PM", event: "Primer Baile y Fiesta", description: "¡Vamos a la pista de baile!", icon: Music },
  { time: "10:00 PM", event: "Corte del Pastel", description: "Un dulce momento para compartir.", icon: Cake },
];

export function Timeline() {
  return (
    <SectionWrapper id="timeline" className="bg-card">
      <SectionHeader
        title="El Gran Día"
        description="Esto es lo que pueden esperar durante la celebración de nuestra boda."
      />
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
        <div className="space-y-12">
          {timelineEvents.map((item, index) => (
            <div key={index} className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <p className="font-semibold">{item.time}</p>
                <h3 className="font-headline text-xl font-bold">{item.event}</h3>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>
              <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <item.icon className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <div className="w-1/2 pl-8" />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
