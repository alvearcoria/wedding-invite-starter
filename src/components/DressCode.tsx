import Image from "next/image";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";

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
          <div className="relative h-96 w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://picsum.photos/400/600"
              alt="Vestimenta para mujeres"
              data-ai-hint="elegant dress"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Mujeres</h3>
            <p className="text-foreground/70">Vestido Largo</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-96 w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://picsum.photos/400/601"
              alt="Vestimenta para hombres"
              data-ai-hint="formal suit"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="font-headline mt-2">
            <h3 className="text-xl font-semibold">Hombres</h3>
            <p className="text-foreground/70">Traje</p>
          </div>
        </div>
      </div>
      <p className="mt-12 text-center text-lg text-foreground/80">{dressCode.note}</p>
    </SectionWrapper>
  );
}
