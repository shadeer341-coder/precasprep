
"use server";

import { z } from "zod";

const ActionInputSchema = z.object({
  audioDataUri: z.string().min(1, { message: "Audio data is missing." }),
  question: z.string(),
});

export type ActionState = {
  formErrors?: string[];
  success?: boolean;
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
      error: "Validation failed. Please ensure you have recorded an answer."
    };
  }
  
  const { audioDataUri, question } = validatedFields.data;

  try {
    // In a real app, you would save the audio data and queue it for human review.
    // For this prototype, we'll just simulate a successful submission.
    console.log("Interview response submitted for review:");
    console.log("Question:", question);
    // console.log("Audio Data URI length:", audioDataUri.length);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unexpected error occurred while submitting the response." };
  }
}
