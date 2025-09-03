'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligently formatting a wedding date.
 *
 * - intelligentDateFormatting - A function that formats the wedding date in a readable and elegant way.
 * - IntelligentDateFormattingInput - The input type for the intelligentDateFormatting function.
 * - IntelligentDateFormattingOutput - The return type for the intelligentDateFormatting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentDateFormattingInputSchema = z.object({
  date: z.string().describe('The wedding date to format (e.g., YYYY-MM-DD).'),
});
export type IntelligentDateFormattingInput = z.infer<typeof IntelligentDateFormattingInputSchema>;

const IntelligentDateFormattingOutputSchema = z.object({
  formattedDate: z.string().describe('The intelligently formatted wedding date.'),
});
export type IntelligentDateFormattingOutput = z.infer<typeof IntelligentDateFormattingOutputSchema>;

export async function intelligentDateFormatting(input: IntelligentDateFormattingInput): Promise<IntelligentDateFormattingOutput> {
  return intelligentDateFormattingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentDateFormattingPrompt',
  input: {schema: IntelligentDateFormattingInputSchema},
  output: {schema: IntelligentDateFormattingOutputSchema},
  prompt: `You are an AI assistant specialized in formatting dates for wedding invitations in Spanish (Mexico).

  Given the wedding date, format it in the most readable and elegant way possible in Spanish.

  Date: {{{date}}}

  Output the formatted date. For example: 29 de Noviembre de 2025`,
});

const intelligentDateFormattingFlow = ai.defineFlow(
  {
    name: 'intelligentDateFormattingFlow',
    inputSchema: IntelligentDateFormattingInputSchema,
    outputSchema: IntelligentDateFormattingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
