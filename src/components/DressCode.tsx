import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { WomanDress } from "./icons/WomanDress";
import { ManSuit } from "./icons/ManSuit";

export function DressCode() {
  const { dressCode } = siteConfig;
  return (
    <SectionWrapper id="dress-code" className="bg-card">
      <SectionHeader
        title={dressCode.title}
        description={dressCode.description}
      />
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-12 text-center md:grid-cols-2">
        <div className="flex flex-col items-center gap-4">
          <WomanDress className="h-32 w-32 text-foreground/80" />
          <div className="font-headline">
            <h3 className="text-xl font-semibold">Mujeres</h3>
            <p className="text-foreground/70">Vestido Largo</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ManSuit className="h-32 w-32 text-foreground/80" />
          <div className="font-headline">
            <h3 className="text-xl font-semibold">Hombres</h3>
            <p className="text-foreground/70">Traje</p>
          </div>
        </div>
      </div>
       <p className="mt-12 text-center text-lg text-foreground/80">{dressCode.note}</p>
    </SectionWrapper>
  );
}
