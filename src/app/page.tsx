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
import { Hotels } from "@/components/Hotels";
import { MusicToggle } from "@/components/MusicToggle";
import { QrAlbum } from "@/components/QrAlbum";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        {siteConfig.sections.music && <MusicToggle />}
        <Hero />
        {siteConfig.sections.story && <AnimatedSection><OurStory /></AnimatedSection>}
        {siteConfig.sections.timeline && <Timeline />}
        {siteConfig.sections.dressCode && <AnimatedSection><DressCode /></AnimatedSection>}
        {siteConfig.sections.venues && <AnimatedSection><Venues /></AnimatedSection>}
        {siteConfig.sections.gallery && <AnimatedSection><Gallery /></AnimatedSection>}
        {siteConfig.sections.qrAlbum && <AnimatedSection><QrAlbum /></AnimatedSection>}
        {siteConfig.sections.gifts && <AnimatedSection><Gifts /></AnimatedSection>}
        {siteConfig.sections.hotels && <AnimatedSection><Hotels /></AnimatedSection>}
        {siteConfig.sections.rsvp && <AnimatedSection><Rsvp /></AnimatedSection>}
      </main>
      <Footer />
    </div>
  );
}
