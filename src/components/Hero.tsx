
import { Suspense } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Countdown } from "./Countdown";
import { FormattedDate } from "./FormattedDate";
import { ArrowDown } from "lucide-react";
import { Icon } from "@/components/icons/index";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full flex-col items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 bg-primary/80 z-10" />
      <div className="absolute inset-0">
        <Image
          src={siteConfig.heroImage.src}
          alt={siteConfig.heroImage.alt}
          data-ai-hint={siteConfig.heroImage.dataAiHint}
          fill
          className="object-cover lg:object-top"
          priority
        />
      </div>

      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Icon name={siteConfig.heroIcon} className="mx-auto mb-4 h-8 w-8 text-white/90" />
          <p className="text-lg tracking-widest uppercase">
            ¡Nos vamos a casar!
          </p>
          <h1 className="mt-4 font-headline text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl text-shadow-lg">
            {siteConfig.couple.her}
            <span className="mx-4 text-4xl sm:text-6xl">&amp;</span>
            {siteConfig.couple.him}
          </h1>
        </div>

        <div className="my-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Suspense fallback={<div className="h-8 w-48 animate-pulse rounded-md bg-white/20" />}>
              <FormattedDate />
            </Suspense>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Countdown />
        </div>
      </div>
      
      <a 
        href="#our-story" 
        aria-label="Desplázate hacia abajo" 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce rounded-full border-2 border-white/50 p-2 transition-colors hover:bg-white/10"
      >
        <ArrowDown className="h-6 w-6 text-white/80"/>
      </a>
    </section>
  );
}
