import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { Shirt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function DressCode() {
  const { dressCode } = siteConfig;
  return (
    <SectionWrapper id="dress-code" className="bg-card">
      <SectionHeader
        title={dressCode.title}
        description={dressCode.description}
      />
      <div className="mx-auto max-w-md">
        <Card className="text-center">
            <CardHeader className="items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <Shirt className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="font-headline">Atuendo Formal</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-foreground/80">{dressCode.note}</p>
            </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
