import { Suspense } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Countdown } from "./Countdown";
import { FormattedDate } from "./FormattedDate";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[600px] w-full flex-col items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 bg-primary/80 z-10" />
      <Image
        src="https://picsum.photos/1200/800"
        alt="Mely y Noe"
        data-ai-hint="romantic couple"
        fill
        className="object-cover"
        priority
      />

      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
            {siteConfig.showCountdown && <Countdown />}
        </div>
        
        <a href="#our-story" aria-label="Scroll down" className="absolute bottom-10 z-20 animate-bounce">
            <ArrowDown className="h-8 w-8 text-white/80"/>
        </a>
      </div>
    </section>
  );
}
