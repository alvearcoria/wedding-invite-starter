
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
import { ShareInvitation } from "@/components/ShareInvitation";
import { SectionSeparator } from "@/components/SectionSeparator";
import { ScrollToTopOnMount } from "@/components/ScrollToTopOnMount";
import { ShareAndConnect } from "@/components/ShareAndConnect";
import { WelcomeModal } from "@/components/WelcomeModal";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
      <main className="flex-1">
        <MusicControl />
        <WelcomeModal />
        
        <Hero />
        <ScrollToTopOnMount />
        
        {siteConfig.sections.story && (
          <AnimatedSection bgClass="bg-background-transparent">
            <OurStory />
          </AnimatedSection>
        )}

        {siteConfig.sections.timeline && (
          <>
            <SectionSeparator waveColor="fill-background-transparent" bgColor="bg-card"/>
            <AnimatedSection bgClass="bg-card">
              <Timeline />
            </AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.dressCode && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background-transparent"/>
            <AnimatedSection bgClass="bg-background-transparent">
              <DressCode />
            </AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.venues && (
          <>
            <SectionSeparator waveColor="fill-background-transparent" bgColor="bg-card"/>
            <AnimatedSection bgClass="bg-card">
              <Venues />
            </AnimatedSection>
          </>
        )}

        {siteConfig.sections.gallery && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background-transparent"/>
            <AnimatedSection bgClass="bg-background-transparent">
              <Gallery />
            </AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.gifts && (
          <>
            <SectionSeparator waveColor="fill-background-transparent" bgColor="bg-card"/>
            <AnimatedSection bgClass="bg-card">
              <Gifts />
            </AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.shareAndConnect && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background-transparent"/>
            <AnimatedSection bgClass="bg-background-transparent">
              <ShareAndConnect />
            </AnimatedSection>
          </>
        )}

        {siteConfig.sections.rsvp && (
          <>
            <SectionSeparator waveColor="fill-background-transparent" bgColor="bg-card"/>
            <AnimatedSection bgClass="bg-card">
              <Rsvp />
            </AnimatedSection>
          </>
        )}

        {siteConfig.sections.share && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background-transparent"/>
            <AnimatedSection bgClass="bg-background-transparent">
              <ShareInvitation />
            </AnimatedSection>
          </>
        )}

        {siteConfig.sections.seeYou && (
          <>
            <SectionSeparator waveColor="fill-background-transparent" bgColor="bg-card"/>
            <AnimatedSection bgClass="bg-card">
              <SeeYou />
            </AnimatedSection>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
