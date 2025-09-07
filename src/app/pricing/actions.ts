
'use server';

import {z} from 'zod';
import {redirect} from 'next/navigation';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';

const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  plan: z.string(),
});

export type FormState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    plan?: string[];
  };
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitPricingForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    plan: formData.get('plan'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  const {name, email, plan} = validatedFields.data;
  const tempPassword = Math.random().toString(36).slice(-8);

  try {
     await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Welcome to precasprep - Your ${plan} Plan`,
      react: WelcomeEmail({ name, email, plan, tempPassword }),
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      message: 'There was an issue sending your confirmation email. Please try again.',
    }
  }

  redirect(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
}
