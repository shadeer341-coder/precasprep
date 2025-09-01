"use server";

import { analyzeInterviewResponse, type AnalyzeInterviewResponseOutput } from "@/ai/flows/analyze-interview-response";
import { z } from "zod";

const ActionInputSchema = z.object({
  audioDataUri: z.string().min(1, { message: "Audio data is missing." }),
  question: z.string(),
});

export type ActionState = {
  formErrors?: string[];
  analysis?: AnalyzeInterviewResponseOutput;
  error?: string;
};

export async function getInterviewFeedback(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = ActionInputSchema.safeParse({
    audioDataUri: formData.get('audioDataUri'),
    question: formData.get('question'),
  });

  if (!validatedFields.success) {
    return {
      formErrors: validatedFields.error.flatten().fieldErrors.audioDataUri,
    };
  }
  
  const { audioDataUri, question } = validatedFields.data;

  try {
    const analysis = await analyzeInterviewResponse({ audioDataUri, question });
    return { analysis };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unexpected error occurred while analyzing the response." };
  }
}
