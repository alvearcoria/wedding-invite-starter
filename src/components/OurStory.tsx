
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "./SectionWrapper";

export function OurStory() {
  const { story, couple } = siteConfig;

  return (
    <SectionWrapper id="our-story" className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-12">
          <p className="mb-2 uppercase tracking-[0.2em] text-foreground/60">{story.intro_title}</p>
          <h2 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl">
            {couple.her} <span className="text-accent">&amp;</span> {couple.him}
          </h2>
        </div>

        <p className="mb-12 text-lg uppercase tracking-wider text-foreground/70 leading-relaxed">
          {story.intro_line1}
          <br />
          {story.intro_line2}
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {story.parents.her && (
            <div className="space-y-2">
              <h3 className="font-headline text-3xl font-bold uppercase tracking-widest">{story.parents.her.title_main}</h3>
              <p className="font-cursive text-4xl text-foreground/80">{story.parents.her.title_secondary}</p>
              <div className="pt-2 text-foreground/70 uppercase tracking-wider">
                <p>{story.parents.her.mother}</p>
                <p>{story.parents.her.father}</p>
              </div>
            </div>
          )}
          {story.parents.him && (
            <div className="space-y-2">
               <h3 className="font-headline text-3xl font-bold uppercase tracking-widest">{story.parents.him.title_main}</h3>
              <p className="font-cursive text-4xl text-foreground/80">{story.parents.him.title_secondary}</p>
              <div className="pt-2 text-foreground/70 uppercase tracking-wider">
                 <p>{story.parents.him.mother}</p>
                {story.parents.him.father && <p>{story.parents.him.father}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <p className="text-lg uppercase tracking-wider text-foreground/70 leading-relaxed">
            {story.outro_line1}
            <br/>
            {story.outro_line2}
          </p>
        </div>

      </div>
    </SectionWrapper>
  );
}
