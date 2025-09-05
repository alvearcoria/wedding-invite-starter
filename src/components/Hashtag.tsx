import { Hash } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "./SectionWrapper";
import { CopyButton } from "./CopyButton";
import { Flower } from "./icons/Flower";

export function Hashtag() {
  const { hashtag } = siteConfig;

  return (
    <SectionWrapper id="hashtag">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-card p-8 text-center shadow-lg">
        <Flower className="h-10 w-10 text-primary" />
        <h3 className="font-headline text-3xl font-semibold">Nuestro Hashtag</h3>
        <p className="max-w-md text-foreground/70">
          ¡Comparte tus fotos y momentos en redes sociales usando nuestro hashtag oficial!
        </p>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-inner">
          <Hash className="h-5 w-5 text-primary" />
          <span className="font-mono text-xl font-medium text-accent-foreground">
            {hashtag}
          </span>
          <CopyButton textToCopy={hashtag} />
        </div>
      </div>
    </SectionWrapper>
  );
}
