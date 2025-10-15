
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
import { ScrollToTopOnMount } from "@/components/ScrollToTopOnMount";
import { ShareAndConnect } from "@/components/ShareAndConnect";
import { WelcomeModal } from "@/components/WelcomeModal";
import { SectionWrapper } from "@/components/SectionWrapper";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
      <main className="flex-1">
        <MusicControl />
        <WelcomeModal />
        
        <Hero />
        <ScrollToTopOnMount />
        
        {siteConfig.sections.story && (
          <SectionWrapper id="our-story" bgClass="bg-background-transparent">
            <OurStory />
          </SectionWrapper>
        )}

        {siteConfig.sections.timeline && (
          <AnimatedSection bgClass="bg-card">
            <Timeline />
          </AnimatedSection>
        )}
        
        {siteConfig.sections.dressCode && (
          <SectionWrapper id="dress-code" bgClass="bg-background-transparent">
            <DressCode />
          </SectionWrapper>
        )}
        
        {siteConfig.sections.venues && (
          <SectionWrapper id="venues" bgClass="bg-card">
            <Venues />
          </SectionWrapper>
        )}

        {siteConfig.sections.gallery && (
          <SectionWrapper id="gallery" bgClass="bg-background-transparent">
            <Gallery />
          </SectionWrapper>
        )}
        
        {siteConfig.sections.gifts && (
          <SectionWrapper id="gifts" bgClass="bg-card">
            <Gifts />
          </SectionWrapper>
        )}
        
        {siteConfig.sections.shareAndConnect && (
          <SectionWrapper id="share-connect" bgClass="bg-background-transparent">
            <ShareAndConnect />
          </SectionWrapper>
        )}

        {siteConfig.sections.rsvp && (
          <SectionWrapper id="rsvp" bgClass="bg-card">
            <Rsvp />
          </SectionWrapper>
        )}

        {siteConfig.sections.share && (
          <SectionWrapper id="share" bgClass="bg-background-transparent">
            <ShareInvitation />
          </SectionWrapper>
        )}

        {siteConfig.sections.seeYou && (
          <SectionWrapper id="see-you" bgClass="bg-card">
            <SeeYou />
          </SectionWrapper>
        )}
      </main>
      <Footer />
    </div>
  );
}
