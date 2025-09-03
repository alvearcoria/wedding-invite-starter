import Image from "next/image";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";

export function OurStory() {
  return (
    <SectionWrapper id="our-story">
      <SectionHeader 
        title="Our Story"
        description="A journey of a thousand miles begins with a single step. Here is ours."
      />
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          <div className="space-y-4 text-foreground/80">
            <p>
              It all started on a crisp autumn evening, under the soft glow of city lights. A chance meeting, a shared laugh, and a spark that neither of us could ignore. What began as a simple conversation soon blossomed into a beautiful connection, built on shared dreams, endless support, and a love for late-night pizza.
            </p>
            <p>
              Through seasons of change and adventures big and small, we found in each other a partner, a confidant, and a best friend. We've navigated life's beautiful complexities hand-in-hand, and our bond has only grown stronger with every passing day.
            </p>
            <p>
              Now, we're taking the next step in our journey together, and we couldn't be more excited to say "I do." We are so grateful for the love and support of our family and friends, and we can't wait to celebrate this special day with all of you.
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
