import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Countdown } from "./Countdown";
import { FormattedDate } from "./FormattedDate";
import { Flower } from "./icons/Flower";

export function Hero() {
  return (
    <section className="relative flex h-[90svh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-background via-rose-50 to-accent/20">
      <div className="absolute inset-0 bg-[url('/watercolor-bg.svg')] bg-cover bg-center opacity-30 mix-blend-soft-light"></div>
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center md:px-6">
        <Flower className="mb-4 h-16 w-16 text-foreground/50" />
        <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
          {siteConfig.couple.her} & {siteConfig.couple.him}
        </h1>
        <p className="mt-4 max-w-[700px] text-lg text-foreground/80 md:text-xl">
          We're getting married!
        </p>
        <div className="my-8 flex flex-col items-center gap-2">
            <Suspense fallback={<div className="h-8 w-48 animate-pulse rounded-md bg-muted" />}>
              <FormattedDate />
            </Suspense>
            {siteConfig.showCountdown && <Countdown />}
        </div>
        <Button size="lg" asChild>
          <Link href="#rsvp">Confirm Assistance</Link>
        </Button>
      </div>
    </section>
  );
}
