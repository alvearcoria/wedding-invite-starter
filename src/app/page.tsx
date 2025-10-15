
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
import { SeeYou } from "@/components/SeeYou";
import { ShareInvitation } from "@/components/ShareInvitation";
import { ScrollToTopOnMount } from "@/components/ScrollToTopOnMount";
import { ShareAndConnect } from "@/components/ShareAndConnect";
import { WelcomeModal } from "@/components/WelcomeModal";
import { SectionWrapper } from "@/components/SectionWrapper";
import { SectionSeparator } from "@/components/SectionSeparator";

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
          <>
            <SectionSeparator waveColor="text-card" />
            <SectionWrapper id="timeline" bgClass="bg-card">
              <Timeline />
            </SectionWrapper>
          </>
        )}
        
        {siteConfig.sections.dressCode && (
          <>
            <SectionSeparator waveColor="text-background-transparent"/>
            <SectionWrapper id="dress-code" bgClass="bg-background-transparent">
              <DressCode />
            </SectionWrapper>
          </>
        )}
        
        {siteConfig.sections.venues && (
           <>
            <SectionSeparator waveColor="text-card" />
            <SectionWrapper id="venues" bgClass="bg-card">
              <Venues />
            </SectionWrapper>
          </>
        )}

        {siteConfig.sections.gallery && (
          <>
            <SectionSeparator waveColor="text-background-transparent"/>
            <SectionWrapper id="gallery" bgClass="bg-background-transparent">
              <Gallery />
            </SectionWrapper>
          </>
        )}
        
        {siteConfig.sections.gifts && (
           <>
            <SectionSeparator waveColor="text-card" />
            <SectionWrapper id="gifts" bgClass="bg-card">
              <Gifts />
            </SectionWrapper>
          </>
        )}
        
        {siteConfig.sections.shareAndConnect && (
          <>
            <SectionSeparator waveColor="text-background-transparent" />
            <SectionWrapper id="share-connect" bgClass="bg-background-transparent">
              <ShareAndConnect />
            </SectionWrapper>
          </>
        )}

        {siteConfig.sections.rsvp && (
           <>
            <SectionSeparator waveColor="text-card" />
            <SectionWrapper id="rsvp" bgClass="bg-card">
              <Rsvp />
            </SectionWrapper>
          </>
        )}

        {siteConfig.sections.share && (
           <>
            <SectionSeparator waveColor="text-background-transparent" />
            <SectionWrapper id="share" bgClass="bg-background-transparent">
              <ShareInvitation />
            </SectionWrapper>
          </>
        )}
        
      </main>
      
      {siteConfig.sections.seeYou && (
          <SeeYou />
      )}
      <Footer />
    </div>
  );
}
