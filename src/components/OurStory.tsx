
import Image from "next/image";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { Flower } from "./icons/Flower";
import { Separator } from "./ui/separator";

export function OurStory() {
  const { story } = siteConfig;

  return (
    <SectionWrapper id="our-story">
      <SectionHeader 
        title={story.title}
      />
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-5">
        
        {/* Contenido de la historia y padres */}
        <div className="space-y-8 lg:col-span-3">
          {story.poem && (
            <blockquote className="border-l-4 border-primary pl-6 italic text-foreground/80">
              <p className="text-lg leading-relaxed">{story.poem}</p>
            </blockquote>
          )}

          <Separator />
          
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left">
            {story.parents.her && (
              <div className="space-y-2">
                <h3 className="font-headline text-lg font-semibold">{story.parents.her.title}</h3>
                <div className="text-foreground/70">
                  <p>{story.parents.her.father}</p>
                  <p>{story.parents.her.mother}</p>
                </div>
              </div>
            )}
            {story.parents.him && (
              <div className="space-y-2">
                <h3 className="font-headline text-lg font-semibold">{story.parents.him.title}</h3>
                <div className="text-foreground/70">
                  <p>{story.parents.him.mother}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Imagen */}
        <div className="order-first lg:order-last lg:col-span-2">
          <div className="relative aspect-4/3">
            <Image
              src={siteConfig.storyImage.src}
              data-ai-hint={siteConfig.storyImage.dataAiHint}
              alt={siteConfig.storyImage.alt}
              fill
              className="rounded-lg object-cover shadow-lg"
            />
             <div className="absolute -bottom-4 -left-4 z-10 rounded-full bg-card p-4 shadow-md">
              <Flower className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
