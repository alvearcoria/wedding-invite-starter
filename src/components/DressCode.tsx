
import Image from "next/image";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export function DressCode() {
  const { dressCode } = siteConfig;
  return (
    <SectionWrapper id="dress-code" className="bg-background py-16 md:py-24">
      <SectionHeader
        title={dressCode.title}
        description={dressCode.description}
      />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center md:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-48 w-48 overflow-hidden rounded-full bg-card shadow-inner">
            <Image
              src={dressCode.womanImage.src}
              alt={dressCode.womanImage.alt}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Mujeres</h3>
            <p className="text-foreground/70">Vestido de noche (midi a maxi)</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
           <div className="relative h-48 w-48 overflow-hidden rounded-full bg-card shadow-inner">
            <Image
              src={dressCode.manImage.src}
              alt={dressCode.manImage.alt}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Hombres</h3>
            <p className="text-foreground/70">Traje formal o semi-formal</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-foreground/80">{dressCode.note}</p>
        {dressCode.imageUrl && (
          <Button asChild className="mt-6" size="lg">
            <a href={dressCode.imageUrl} target="_blank" rel="noopener noreferrer">
              {dressCode.imageButtonLabel}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </SectionWrapper>
  );
}
