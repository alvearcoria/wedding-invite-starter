
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
import { QrAlbum } from "@/components/QrAlbum";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Hashtag } from "@/components/Hashtag";
import { SeeYou } from "@/components/SeeYou";
import { WelcomeModal } from "@/components/WelcomeModal";
import { ShareInvitation } from "@/components/ShareInvitation";
import { SectionSeparator } from "@/components/SectionSeparator";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden">
      <main className="flex-1">
        <MusicControl />
        <WelcomeModal />
        <Hero />
        
        {siteConfig.sections.story && (
          <>
            <SectionSeparator waveColor="fill-background" />
            <AnimatedSection direction="left"><OurStory /></AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.timeline && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <Timeline />
           </>
        )}
        
        {siteConfig.sections.dressCode && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection><DressCode /></AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.venues && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection direction="right"><Venues /></AnimatedSection>
           </>
        )}

        {siteConfig.sections.gallery && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection><Gallery /></AnimatedSection>
          </>
        )}

        {siteConfig.sections.qrAlbum && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection direction="up"><QrAlbum /></AnimatedSection>
           </>
        )}

        {siteConfig.sections.gifts && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection direction="left"><Gifts /></AnimatedSection>
          </>
        )}
        
        {siteConfig.sections.hashtag && (
           <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection direction="up"><Hashtag /></AnimatedSection>
           </>
        )}

        {siteConfig.sections.rsvp && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection><Rsvp /></AnimatedSection>
          </>
        )}

        {siteConfig.sections.share && (
          <>
            <SectionSeparator waveColor="fill-background" bgColor="bg-card"/>
            <AnimatedSection><ShareInvitation /></AnimatedSection>
          </>
        )}

        {siteConfig.sections.seeYou && (
          <>
            <SectionSeparator waveColor="fill-card" bgColor="bg-background"/>
            <AnimatedSection><SeeYou /></AnimatedSection>
          </>
        )}

      </main>
      <Footer />
    </div>
  );
}
