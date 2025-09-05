import { Hash } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "./SectionWrapper";
import { CopyButton } from "./CopyButton";

export function Hashtag() {
  const { hashtag } = siteConfig;

  return (
    <SectionWrapper id="hashtag">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed border-border bg-card p-8 text-center">
        <Hash className="h-12 w-12 text-primary" />
        <h3 className="font-headline text-2xl font-semibold">Nuestro Hashtag</h3>
        <p className="max-w-md text-foreground/70">
          ¡Comparte tus fotos y momentos en redes sociales usando nuestro hashtag oficial!
        </p>
        <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2">
          <span className="font-mono text-lg font-medium text-accent-foreground">
            {hashtag}
          </span>
          <CopyButton textToCopy={hashtag} />
        </div>
      </div>
    </SectionWrapper>
  );
}
