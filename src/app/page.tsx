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

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-background">
      <main className="flex-1">
        <MusicControl />
        <WelcomeModal />
        
        <Hero />
        <ScrollToTopOnMount />
        
        {siteConfig.sections.story && (
          <SectionWrapper id="our-story" bgClass="bg-background-transparent py-16 md:py-20" dividerColor="hsl(var(--card))">
            <OurStory />
          </SectionWrapper>
        )}

        {siteConfig.sections.timeline && (
            <SectionWrapper id="timeline" bgClass="bg-card py-16 md:py-20" dividerColor="hsl(var(--background))">
              <Timeline />
            </SectionWrapper>
        )}
        
        {siteConfig.sections.dressCode && (
            <SectionWrapper id="dress-code" bgClass="bg-background-transparent py-16 md:py-20" dividerColor="hsl(var(--card))">
              <DressCode />
            </SectionWrapper>
        )}
        
        {siteConfig.sections.venues && (
           <SectionWrapper id="venues" bgClass="bg-card py-16 md:py-20" dividerColor="hsl(var(--background))">
              <Venues />
            </SectionWrapper>
        )}

        {siteConfig.sections.gallery && (
            <SectionWrapper id="gallery" bgClass="bg-background-transparent py-16 md:py-20" dividerColor="hsl(var(--card))">
              <Gallery />
            </SectionWrapper>
        )}
        
        {siteConfig.sections.gifts && (
            <SectionWrapper id="gifts" bgClass="bg-card py-16 md:py-20" dividerColor="hsl(var(--background))">
              <Gifts />
            </SectionWrapper>
        )}
        
        {siteConfig.sections.shareAndConnect && (
            <SectionWrapper id="share-connect" bgClass="bg-background-transparent py-16 md:py-20" dividerColor="hsl(var(--card))">
              <ShareAndConnect />
            </SectionWrapper>
        )}

        {siteConfig.sections.rsvp && (
            <SectionWrapper id="rsvp" bgClass="bg-card py-16 md:py-20" dividerColor="hsl(var(--background))">
              <Rsvp />
            </SectionWrapper>
        )}

        {siteConfig.sections.share && (
            <SectionWrapper id="share" bgClass="bg-background-transparent py-16 md:py-20">
              <ShareInvitation />
            </SectionWrapper>
        )}
        
      </main>
      
      {siteConfig.sections.seeYou && (
          <SeeYou />
      )}
      <Footer />
    </div>
  );
}
