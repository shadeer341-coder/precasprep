
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

export async function submitPricingForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !resendApiKey) {
    console.error('Missing environment variables for Supabase or Resend');
    return {
      message: 'Server configuration error. Please check environment variables.',
      errors: { _form: ['Application is not configured correctly.'] }
    };
  }

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
  
  const resend = new Resend(resendApiKey);
  const { name, email, plan } = validatedFields.data;
  const tempPassword = Math.random().toString(36).slice(-8);
  const supabase = createServerClient();

  // Create user in Supabase
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: tempPassword,
    email_confirm: true, // Auto-confirm email for immediate login
    user_metadata: {
      name: name,
      plan: plan,
      password_is_temporary: true
    }
  });

  if (authError) {
    console.error('Supabase user creation error:', authError);
    return {
      message: 'Could not create user. If you already have an account, please log in.',
      errors: { _form: [authError.message] }
    };
  }

  // Send welcome email
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Welcome to precasprep - Your ${plan} Plan`,
      react: WelcomeEmail({ name, email, plan, tempPassword }),
    });
  } catch (error) {
    console.error('Email sending error:', error);
    // Optionally, you might want to delete the user if the email fails
    // await supabase.auth.admin.deleteUser(authData.user.id);
    return {
      message: 'There was an issue sending your confirmation email. Please try again.',
    };
  }

  redirect(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
}
