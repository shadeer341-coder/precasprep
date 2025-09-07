
'use server';

import {z} from 'zod';
import {redirect} from 'next/navigation';

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

  const {name, email} = validatedFields.data;

  // In a real app, you would:
  // 1. Create a new user in your database.
  // 2. Generate a temporary password.
  // 3. Send an email with the login details.
  console.log('Simulating user creation and email for:', validatedFields.data);

  redirect(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
}
