import Image from "next/image";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";

export function OurStory() {
  return (
    <SectionWrapper id="our-story">
      <SectionHeader 
        title="Nuestra Historia"
        description="Un viaje de mil millas comienza con un solo paso. Aquí está el nuestro."
      />
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4 text-foreground/80">
            <p>
              Todo comenzó en una fresca tarde de otoño, bajo el suave resplandor de las luces de la ciudad. Un encuentro casual, una risa compartida y una chispa que ninguno de los dos pudo ignorar. Lo que empezó como una simple conversación pronto floreció en una hermosa conexión, construida sobre sueños compartidos, apoyo infinito y un amor por la pizza a altas horas de la noche.
            </p>
            <p>
              A través de temporadas de cambio y aventuras grandes y pequeñas, encontramos en el otro un compañero, un confidente y un mejor amigo. Hemos navegado las hermosas complejidades de la vida de la mano, y nuestro vínculo solo se ha fortalecido con cada día que pasa.
            </p>
            <p>
              Ahora, estamos dando el siguiente paso en nuestro viaje juntos, y no podríamos estar más emocionados de decir "Sí, acepto". Estamos muy agradecidos por el amor y el apoyo de nuestra familia y amigos, y no podemos esperar para celebrar este día tan especial con todos ustedes.
            </p>
          </div>
          <div className="order-first md:order-last">
            <Image
              src="https://picsum.photos/800/600"
              data-ai-hint="couple portrait"
              alt="Mely & Noe"
              width={800}
              height={600}
              className="aspect-4/3 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
