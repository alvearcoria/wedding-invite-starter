import { Gift, University } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { CopyButton } from "./CopyButton";

export function Gifts() {
  const { giftRegistry, bankDetails } = siteConfig;
  const showSection = giftRegistry.enabled || bankDetails.enabled;

  if (!showSection) return null;

  return (
    <SectionWrapper id="gifts">
      <SectionHeader
        title="Regalos"
        description="Su presencia en nuestra boda es el mejor regalo de todos. Sin embargo, si desean hacernos un obsequio, estaremos encantados."
      />
      <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
        {giftRegistry.enabled && (
          <Card>
            <CardHeader>
              <Gift className="mb-4 h-10 w-10 text-accent-foreground" />
              <CardTitle className="font-headline">Mesa de Regalos</CardTitle>
              <CardDescription>
                Tenemos una mesa de regalos para quienes deseen contribuir de esta manera.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href={giftRegistry.url} target="_blank" rel="noopener noreferrer">
                  Ver Mesa de Regalos
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
        {bankDetails.enabled && (
          <Card>
            <CardHeader>
              <University className="mb-4 h-10 w-10 text-accent-foreground" />
              <CardTitle className="font-headline">Fondo para Luna de Miel</CardTitle>
              <CardDescription>
                Una contribución a nuestro fondo para la luna de miel también sería muy apreciada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Titular de la cuenta</p>
                <p className="text-foreground/70">{bankDetails.accountHolder}</p>
              </div>
              <div>
                <p className="text-sm font-medium">IBAN</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-foreground/70 tracking-wider">
                    {bankDetails.iban.slice(0, 4)} **** **** **** {bankDetails.iban.slice(-4)}
                  </p>
                  <CopyButton textToCopy={bankDetails.iban} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SectionWrapper>
  );
}
