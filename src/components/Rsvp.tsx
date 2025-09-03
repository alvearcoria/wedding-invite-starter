import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { RsvpForm } from "./RsvpForm";

export function Rsvp() {
  return (
    <SectionWrapper id="rsvp" className="bg-card">
      <SectionHeader
        title="Confirm Your Assistance"
        description="Please let us know if you can make it by November 14, 2024. We can't wait to celebrate with you!"
      />
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">RSVP</CardTitle>
            <CardDescription>
              Fill out the form below to let us know you're coming.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RsvpForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
