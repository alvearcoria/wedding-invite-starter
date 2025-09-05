import { siteConfig } from "@/config/site";
import { Heart } from "./icons/Heart";

export function SeeYou() {
  return (
    <section className="w-full py-20 md:py-24 lg:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
        <Heart className="h-10 w-10 text-primary" />
        <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          ¡Te esperamos!
        </h2>
        <p className="max-w-xl text-lg text-foreground/70">
          Tu presencia es el regalo más importante para nosotros. Estamos muy emocionados de compartir este día tan especial contigo.
        </p>
      </div>
    </section>
  );
}
