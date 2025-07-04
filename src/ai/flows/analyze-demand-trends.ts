'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing airline booking data to identify demand trends and pricing changes.
 *
 * - analyzeDemandTrends - A function that orchestrates the demand trend analysis process.
 * - AnalyzeDemandTrendsInput - The input type for the analyzeDemandTrends function, which includes the scraped airline booking data.
 * - AnalyzeDemandTrendsOutput - The return type for the analyzeDemandTrends function, providing insights into demand trends and pricing changes.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDemandTrendsInputSchema = z.object({
  scrapedData: z
    .string()
    .describe(
      'The scraped airline booking data as a string.  This data should include information such as routes, prices, and booking dates.'
    ),
});
export type AnalyzeDemandTrendsInput = z.infer<typeof AnalyzeDemandTrendsInputSchema>;

const AnalyzeDemandTrendsOutputSchema = z.object({
  demandTrends: z
    .string()
    .describe('A summary of the key demand trends identified in the data.'),
  pricingChanges: z
    .string()
    .describe('An analysis of the pricing changes observed in the data.'),
  popularRoutes: z
    .string()
    .describe('A list of the most popular routes identified in the data.'),
  highDemandPeriods: z
    .string()
    .describe('A summary of the periods with the highest demand.'),
});
export type AnalyzeDemandTrendsOutput = z.infer<typeof AnalyzeDemandTrendsOutputSchema>;

export async function analyzeDemandTrends(input: AnalyzeDemandTrendsInput): Promise<AnalyzeDemandTrendsOutput> {
  return analyzeDemandTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDemandTrendsPrompt',
  input: {schema: AnalyzeDemandTrendsInputSchema},
  output: {schema: AnalyzeDemandTrendsOutputSchema},
  prompt: `You are an expert in analyzing airline booking data.  Your goal is to identify key demand trends and pricing changes from the provided scraped data.\n\nAnalyze the following data:\n\n{{{scrapedData}}}\n\nBased on this data, provide the following:\n\n*  A summary of the key demand trends identified in the data (demandTrends).\n*  An analysis of the pricing changes observed in the data (pricingChanges).\n*  A list of the most popular routes identified in the data (popularRoutes).\n*  A summary of the periods with the highest demand (highDemandPeriods).`,
});

const analyzeDemandTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeDemandTrendsFlow',
    inputSchema: AnalyzeDemandTrendsInputSchema,
    outputSchema: AnalyzeDemandTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
