import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { Timeline } from "@/components/Timeline";
import { Venues } from "@/components/Venues";
import { Gallery } from "@/components/Gallery";
import { Gifts } from "@/components/Gifts";
import { Rsvp } from "@/components/Rsvp";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <Hero />
        <Header />
        {siteConfig.showOurStory && <OurStory />}
        {siteConfig.showTimeline && <Timeline />}
        {siteConfig.showVenues && <Venues />}
        {siteConfig.showGallery && <Gallery />}
        {siteConfig.showGifts && <Gifts />}
        {siteConfig.showRsvp && <Rsvp />}
      </main>
      <Footer />
    </div>
  );
}
