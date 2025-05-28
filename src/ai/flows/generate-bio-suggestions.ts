'use server';
/**
 * @fileOverview A biography suggestion AI agent.
 *
 * - generateBioSuggestions - A function that handles the biography generation process.
 * - GenerateBioSuggestionsInput - The input type for the generateBioSuggestions function.
 * - GenerateBioSuggestionsOutput - The return type for the generateBioSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBioSuggestionsInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  profession: z.string().describe('The profession of the person.'),
  achievements: z.string().describe('A list of achievements of the person.'),
  style: z.string().describe('The desired style of the biography (e.g., formal, casual, humorous).'),
});
export type GenerateBioSuggestionsInput = z.infer<typeof GenerateBioSuggestionsInputSchema>;

const GenerateBioSuggestionsOutputSchema = z.object({
  bio: z.string().describe('A biography suggestion for the person.'),
});
export type GenerateBioSuggestionsOutput = z.infer<typeof GenerateBioSuggestionsOutputSchema>;

export async function generateBioSuggestions(input: GenerateBioSuggestionsInput): Promise<GenerateBioSuggestionsOutput> {
  return generateBioSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBioSuggestionsPrompt',
  input: {schema: GenerateBioSuggestionsInputSchema},
  output: {schema: GenerateBioSuggestionsOutputSchema},
  prompt: `You are an expert biography writer.

  You will use the following information to write a biography suggestion for the person.

  Name: {{{name}}}
  Profession: {{{profession}}}
  Achievements: {{{achievements}}}
  Style: {{{style}}}

  Write a biography suggestion for the person. It should be no more than 200 words.
  `,
});

const generateBioSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateBioSuggestionsFlow',
    inputSchema: GenerateBioSuggestionsInputSchema,
    outputSchema: GenerateBioSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
