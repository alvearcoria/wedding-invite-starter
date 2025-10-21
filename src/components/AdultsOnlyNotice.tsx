
import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionWrapper";
import { Icon } from "./icons";

export function AdultsOnlyNotice() {
  const { adultsOnly } = siteConfig;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Icon name="baby" className="mx-auto h-12 w-12 text-primary/80 mb-4" />
      <SectionHeader
        title={adultsOnly.title}
        description={adultsOnly.description}
      />
    </div>
  );
}
