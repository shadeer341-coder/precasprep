
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
    if (authError.message.includes('unique constraint')) {
        return {
          message: 'This email address is already registered. Please try logging in.',
          errors: { _form: ['Email already in use.'] }
        };
    }
    return {
      message: 'Could not create user. If you already have an account, please log in.',
      errors: { _form: [authError.message] }
    };
  }

  if (!authData.user) {
     return {
      message: 'An unexpected error occurred during user creation.',
      errors: { _form: ['User data not returned from Supabase.'] }
    };
  }

  // Send welcome email
  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'Precasprep <noreply@precasprep.com>',
      to: email,
      subject: `Welcome to precasprep - Your ${plan} Plan`,
      react: WelcomeEmail({ name, email, plan, tempPassword }),
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Optionally, you might want to delete the user if the email fails to ensure a clean state
    await supabase.auth.admin.deleteUser(authData.user.id);
    return {
      message: `We couldn't send your welcome email. The error was: ${error.message}`,
      errors: { _form: ['Email delivery failed.'] }
    };
  }

  redirect(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
}
