
"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  interest: z.string(),
  email: z.string().email("Please enter a valid email address."),
  terms: z.boolean(),
});


export async function submitContactForm(data: z.infer<typeof formSchema>) {
  console.log("Form data submitted:", data);
  // In a real app, you'd send this to your backend, email service, etc.
  return { success: true, message: "Thank you for your message! We'll be in touch soon." };
}
