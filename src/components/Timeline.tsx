import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { Cake, Camera, GlassWater, Music, HeartHandshake } from "lucide-react";

const timelineEvents = [
  { time: "4:00 PM", event: "Ceremony", description: "Witness our vows and the start of our forever.", icon: HeartHandshake },
  { time: "5:00 PM", event: "Cocktail Hour", description: "Enjoy drinks and light bites while we take photos.", icon: GlassWater },
  { time: "6:30 PM", event: "Reception", description: "Join us for dinner and toasts.", icon: Camera },
  { time: "8:00 PM", event: "First Dance & Party", description: "Let's hit the dance floor!", icon: Music },
  { time: "10:00 PM", event: "Cake Cutting", description: "A sweet moment to share.", icon: Cake },
];

export function Timeline() {
  return (
    <SectionWrapper id="timeline" className="bg-card">
      <SectionHeader
        title="The Big Day"
        description="Here’s what to expect during our wedding celebration."
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
