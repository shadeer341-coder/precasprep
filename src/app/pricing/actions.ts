
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';
import { createServerClient } from '@/lib/supabase/server';

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
    _form?: string[];
  };
};

// This function is being deprecated in favor of processOrder in checkout/actions.ts
// It is kept here to avoid breaking any other potential dependencies but should be removed later.
export async function submitPricingForm(prevState: FormState, formData: FormData): Promise<FormState> {
  return {
    message: "This form is no longer in use. Please proceed to the checkout page.",
    errors: { _form: ["This form is deprecated."]}
  }
}
