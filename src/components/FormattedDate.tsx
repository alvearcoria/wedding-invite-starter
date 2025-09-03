import { intelligentDateFormatting } from "@/ai/flows/intelligent-date-formatting";
import { siteConfig } from "@/config/site";

export async function FormattedDate() {
  const dateOnly = siteConfig.weddingDate.split("T")[0];
  try {
    const { formattedDate } = await intelligentDateFormatting({ date: dateOnly });
    return <p className="font-headline text-2xl md:text-3xl tracking-wide">{formattedDate}</p>;
  } catch (error) {
    console.error("AI date formatting failed, falling back to simple format.", error);
    const date = new Date(siteConfig.weddingDate);
    const fallbackDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return <p className="font-headline text-2xl md:text-3xl tracking-wide">{fallbackDate}</p>;
  }
}
