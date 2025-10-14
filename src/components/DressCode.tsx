
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { WomanDress } from "./icons/WomanDress";
import { ManSuit } from "./icons/ManSuit";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export function DressCode() {
  const { dressCode } = siteConfig;
  return (
    <SectionWrapper id="dress-code" className="bg-card">
      <SectionHeader
        title={dressCode.title}
        description={dressCode.description}
      />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center md:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-background p-8 shadow-inner">
            <WomanDress className="h-full w-full text-foreground/80" />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Mujeres</h3>
            <p className="text-foreground/70">Vestido de noche/formales (midi a maxi)</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-background p-8 shadow-inner">
            <ManSuit className="h-full w-full text-foreground/80" />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Hombres</h3>
            <p className="text-foreground/70">Casual, Formal y Vaquero Formal</p>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-foreground/80">{dressCode.note}</p>
        {dressCode.imageUrl && (
          <Button asChild variant="outline" className="mt-6">
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
