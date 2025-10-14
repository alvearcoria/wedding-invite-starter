
import { Gift, University } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionWrapper, SectionHeader } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { CopyToClipboard } from "./CopyToClipboard";
import { Envelope } from "./icons/Envelope";
import { Money } from "./icons/Money";
import { Chest } from "./icons/Chest";
import { Plus, ArrowRight } from "lucide-react";

export function Gifts() {
  const { gifts } = siteConfig;
  const showBank = gifts.modes.includes('bank');
  const showList = gifts.modes.includes('list');
  const showEnvelope = gifts.modes.includes('envelope');

  const enabledModesCount = [showBank, showList, showEnvelope].filter(Boolean).length;

  if (enabledModesCount === 0) {
    return null;
  }

  const gridClasses = enabledModesCount > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <SectionWrapper id="gifts" className="py-16 md:py-24 lg:py-32">
      <SectionHeader
        title={gifts.title}
        description={gifts.intro}
      />
      <div className={`mx-auto grid max-w-4xl gap-8 md:grid-cols-1 ${gridClasses}`}>
        {showEnvelope && (
           <div className={enabledModesCount === 1 ? "max-w-md mx-auto" : ""}>
             <Card className="flex flex-col items-center justify-center p-6 text-center h-full bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <Envelope className="mx-auto mb-4 h-16 w-16 text-primary/80" />
                <CardTitle className="font-headline text-2xl">{gifts.envelope.title}</CardTitle>
                <CardDescription>
                  {gifts.envelope.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                 <div className="flex items-center justify-center gap-2 text-foreground/70">
                    <Envelope className="h-8 w-8" />
                    <Plus className="h-5 w-5" />
                    <Money className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5" />
                    <Chest className="h-8 w-8" />
                 </div>
                 <p className="font-cursive text-2xl text-foreground/80">Thank you :)</p>
              </CardContent>
            </Card>
           </div>
        )}
        {showList && (
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
                <a href={gifts.giftListUrl} target="_blank" rel="noopener noreferrer">
                  Ver Mesa de Regalos
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
        {showBank && (
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
                <p className="text-sm font-medium">{gifts.bank.label}</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-foreground/70 tracking-wider">
                    {gifts.bank.valueMasked}
                  </p>
                  <CopyToClipboard textToCopy={gifts.bank.valueFull} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SectionWrapper>
  );
}
