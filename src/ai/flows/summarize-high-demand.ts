// Summarize high demand periods and locations based on analyzed data.

'use server';

/**
 * @fileOverview Summarizes periods and locations of high demand based on analyzed data.
 *
 * - summarizeHighDemand - A function that summarizes high demand periods and locations.
 * - SummarizeHighDemandInput - The input type for the summarizeHighDemand function.
 * - SummarizeHighDemandOutput - The return type for the summarizeHighDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHighDemandInputSchema = z.object({
  analyzedData: z
    .string()
    .describe(
      'The analyzed data containing information about airline bookings, demand trends, pricing changes, and popular routes.'
    ),
});
export type SummarizeHighDemandInput = z.infer<typeof SummarizeHighDemandInputSchema>;

const SummarizeHighDemandOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of periods and locations of high demand, highlighting peak travel times and popular destinations.'
    ),
});
export type SummarizeHighDemandOutput = z.infer<typeof SummarizeHighDemandOutputSchema>;

export async function summarizeHighDemand(
  input: SummarizeHighDemandInput
): Promise<SummarizeHighDemandOutput> {
  return summarizeHighDemandFlow(input);
}

const summarizeHighDemandPrompt = ai.definePrompt({
  name: 'summarizeHighDemandPrompt',
  input: {schema: SummarizeHighDemandInputSchema},
  output: {schema: SummarizeHighDemandOutputSchema},
  prompt: `You are an AI assistant specializing in travel data analysis. Based on the following analyzed data, summarize the periods and locations of high demand. Highlight peak travel times and popular destinations.

Analyzed Data: {{{analyzedData}}}`,
});

const summarizeHighDemandFlow = ai.defineFlow(
  {
    name: 'summarizeHighDemandFlow',
    inputSchema: SummarizeHighDemandInputSchema,
    outputSchema: SummarizeHighDemandOutputSchema,
  },
  async input => {
    const {output} = await summarizeHighDemandPrompt(input);
    return output!;
  }
);
