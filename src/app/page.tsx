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

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        {siteConfig.sections.music && <MusicToggle />}
        <Hero />
        {siteConfig.sections.story && <OurStory />}
        {siteConfig.sections.timeline && <Timeline />}
        {siteConfig.sections.dressCode && <DressCode />}
        {siteConfig.sections.venues && <Venues />}
        {siteConfig.sections.gallery && <Gallery />}
        {siteConfig.sections.qrAlbum && <QrAlbum />}
        {siteConfig.sections.gifts && <Gifts />}
        {siteConfig.sections.hotels && <Hotels />}
        {siteConfig.sections.rsvp && <Rsvp />}
      </main>
      <Footer />
    </div>
  );
}
