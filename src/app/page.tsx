
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
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden">
      <main className="flex-1">
        <WelcomeModal />
        <MusicControl />
        
        <Hero />
        <ScrollToTopOnMount />
        
        <AnimatedSection>
            {siteConfig.sections.story && (
                <>
                    <SectionSeparator waveColor="fill-background" bgColor="bg-transparent" />
                    <OurStory />
                </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.timeline && (
            <>
                <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
                <Timeline />
            </>
            )}
        </AnimatedSection>
        
        <AnimatedSection>
            {siteConfig.sections.dressCode && (
            <>
                <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
                <DressCode />
            </>
            )}
        </AnimatedSection>
        
        <AnimatedSection>
            {siteConfig.sections.venues && (
            <>
                <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
                <Venues />
            </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.gallery && (
            <>
                <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
                <Gallery />
            </>
            )}
        </AnimatedSection>
        
        <AnimatedSection>
            {siteConfig.sections.hotels && (
            <>
                <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
                <Hotels />
            </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.gifts && (
            <>
                <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
                <Gifts />
            </>
            )}
        </AnimatedSection>
        
        <AnimatedSection>
            {siteConfig.sections.shareAndConnect && (
            <>
                <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
                <ShareAndConnect />
            </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.rsvp && (
            <>
                <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
                <Rsvp />
            </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.share && (
            <>
                <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
                <ShareInvitation />
            </>
            )}
        </AnimatedSection>

        <AnimatedSection>
            {siteConfig.sections.seeYou && (
            <>
                <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
                <SeeYou />
            </>
            )}
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
}
