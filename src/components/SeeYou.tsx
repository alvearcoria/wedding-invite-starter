
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Heart } from "./icons/Heart";

export function SeeYou() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40">
       <div className="absolute inset-0 bg-primary/80 z-10" />
      <Image
        src={siteConfig.seeYouImage.src}
        alt={siteConfig.seeYouImage.alt}
        data-ai-hint={siteConfig.seeYouImage.dataAiHint}
        fill
        className="object-cover"
      />
      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
        <Heart className="h-10 w-10" />
        <h2 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl text-shadow-lg">
          ¡Te esperamos!
        </h2>
        <p className="max-w-xl text-lg text-white/90">
          Tu presencia es el regalo más importante para nosotros. Estamos muy emocionados de compartir este día tan especial contigo.
        </p>
      </div>
    </section>
  );
}
