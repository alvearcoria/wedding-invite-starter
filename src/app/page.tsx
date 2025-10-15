
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { Timeline } from "@/components/Timeline";
import { Venues } from "@/components/Venues";
import { Gallery } from "@/components/Gallery";
import { Gifts } from "@/components/Gifts";
import { Rsvp } from "@/components/Rsvp";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { DressCode } from "@/components/DressCode";
import { MusicControl } from "@/components/MusicControl";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SeeYou } from "@/components/SeeYou";
import { WelcomeModal } from "@/components/WelcomeModal";
import { ShareInvitation } from "@/components/ShareInvitation";
import { SectionSeparator } from "@/components/SectionSeparator";
import { Hotels } from "@/components/Hotels";
import { ScrollToTopOnMount } from "@/components/ScrollToTopOnMount";
import { ShareAndConnect } from "@/components/ShareAndConnect";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
      <main className="flex-1">
        <WelcomeModal />
        <MusicControl />
        
        <Hero />
        <ScrollToTopOnMount />
        
        {siteConfig.sections.story && (
            <AnimatedSection>
                <OurStory />
            </AnimatedSection>
        )}

        {siteConfig.sections.timeline && (
           <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection>
                <Timeline />
            </AnimatedSection>
           </>
        )}
        
        {siteConfig.sections.dressCode && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection>
                <DressCode />
            </AnimatedSection>
           </>
        )}
        
        {siteConfig.sections.venues && (
            <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection>
                <Venues />
            </AnimatedSection>
            </>
        )}

        {siteConfig.sections.gallery && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection>
                <Gallery />
            </AnimatedSection>
           </>
        )}
        
        {siteConfig.sections.hotels && (
           <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection>
                <Hotels />
            </AnimatedSection>
           </>
        )}

        {siteConfig.sections.gifts && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection>
                <Gifts />
            </AnimatedSection>
           </>
        )}
        
        {siteConfig.sections.shareAndConnect && (
            <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection>
                <ShareAndConnect />
            </AnimatedSection>
            </>
        )}

        {siteConfig.sections.rsvp && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection>
                <Rsvp />
            </AnimatedSection>
           </>
        )}

        {siteConfig.sections.share && (
            <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection>
                <ShareInvitation />
            </AnimatedSection>
            </>
        )}

        {siteConfig.sections.seeYou && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection>
                <SeeYou />
            </AnimatedSection>
           </>
        )}

      </main>
      <Footer />
    </div>
  );
}
