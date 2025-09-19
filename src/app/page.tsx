
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

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <MusicControl />
        <WelcomeModal />
        <Hero />
        {siteConfig.sections.story && <AnimatedSection direction="left"><OurStory /></AnimatedSection>}
        {siteConfig.sections.timeline && <Timeline />}
        {siteConfig.sections.dressCode && <AnimatedSection><DressCode /></AnimatedSection>}
        {siteConfig.sections.venues && <AnimatedSection direction="right"><Venues /></AnimatedSection>}
        {siteConfig.sections.gallery && <AnimatedSection><Gallery /></AnimatedSection>}
        {siteConfig.sections.qrAlbum && <AnimatedSection direction="up"><QrAlbum /></AnimatedSection>}
        {siteConfig.sections.gifts && <AnimatedSection direction="left"><Gifts /></AnimatedSection>}
        {siteConfig.sections.share && <AnimatedSection><ShareInvitation /></AnimatedSection>}
        {siteConfig.sections.hashtag && <AnimatedSection direction="up"><Hashtag /></AnimatedSection>}
        {siteConfig.sections.rsvp && <AnimatedSection><Rsvp /></AnimatedSection>}
        {siteConfig.sections.seeYou && <AnimatedSection><SeeYou /></AnimatedSection>}
      </main>
      <Footer />
    </div>
  );
}
