'use server';

/**
 * @fileOverview Provides AI-driven feedback on recorded interview responses.
 *
 * - analyzeInterviewResponse - A function that handles the interview response analysis process.
 * - AnalyzeInterviewResponseInput - The input type for the analyzeInterviewResponse function.
 * - AnalyzeInterviewResponseOutput - The return type for the analyzeInterviewResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeInterviewResponseInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The recorded interview response as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  question: z.string().describe('The interview question asked.'),
});
export type AnalyzeInterviewResponseInput = z.infer<
  typeof AnalyzeInterviewResponseInputSchema
>;

const AnalyzeInterviewResponseOutputSchema = z.object({
  sentimentAnalysis: z
    .string()
    .describe('The overall sentiment of the interview response.'),
  keywordAnalysis: z
    .string()
    .describe('Key topics and keywords discussed in the response.'),
  strengths: z.string().describe('Identified strengths in the response.'),
  weaknesses: z.string().describe('Identified weaknesses in the response.'),
  overallFeedback: z
    .string()
    .describe('Overall feedback and suggestions for improvement.'),
});
export type AnalyzeInterviewResponseOutput = z.infer<
  typeof AnalyzeInterviewResponseOutputSchema
>;

export async function analyzeInterviewResponse(
  input: AnalyzeInterviewResponseInput
): Promise<AnalyzeInterviewResponseOutput> {
  return analyzeInterviewResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeInterviewResponsePrompt',
  input: {schema: AnalyzeInterviewResponseInputSchema},
  output: {schema: AnalyzeInterviewResponseOutputSchema},
  prompt: `You are an AI-powered interview coach providing feedback on interview responses.

  Analyze the recorded response to the following question:
  Question: {{{question}}}

  Recorded Response: {{media url=audioDataUri}}

  Provide the following feedback:
  - Sentiment Analysis: Analyze the overall sentiment of the response (positive, negative, neutral).
  - Keyword Analysis: Identify key topics and keywords discussed in the response.
  - Strengths: Highlight the strengths of the response.
  - Weaknesses: Point out the weaknesses of the response.
  - Overall Feedback: Provide overall feedback and suggestions for improvement.

  Format the output as a JSON object.`,
});

const analyzeInterviewResponseFlow = ai.defineFlow(
  {
    name: 'analyzeInterviewResponseFlow',
    inputSchema: AnalyzeInterviewResponseInputSchema,
    outputSchema: AnalyzeInterviewResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
