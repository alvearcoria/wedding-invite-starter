import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { RsvpForm } from "./RsvpForm";

export function Rsvp() {
  return (
    <SectionWrapper id="rsvp" className="bg-card">
      <SectionHeader
        title="Confirma Tu Asistencia"
        description="Por favor, haznos saber si podrás asistir antes del 14 de noviembre de 2024. ¡Estamos ansiosos por celebrar contigo!"
      />
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">RSVP</CardTitle>
            <CardDescription>
              Llena el siguiente formulario para informarnos que vendrás.
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
