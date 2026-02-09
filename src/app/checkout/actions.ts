
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const OrderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  plan: z.string().min(1, 'Plan is required.'),
  orderId: z.string().min(1, 'Order ID is missing'),
});

export type OrderState = {
  success: boolean;
  message: string;
};

export async function processOrder(
  data: z.infer<typeof OrderSchema>
): Promise<OrderState> {
  const validatedFields = OrderSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided. Please check your inputs.',
    };
  }
  
  const { name, email, plan } = validatedFields.data;

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !resendApiKey) {
    console.error('Missing environment variables for Supabase or Resend');
    return {
      success: false,
      message: 'Server configuration error. Please contact support.',
    };
  }

  const supabase = createServerClient();
  const tempPassword = "asd@123";

  // Determine group_id based on plan name
  let groupId: number;
  if (plan.toLowerCase().includes('agency') || plan.toLowerCase().includes('enterprise')) {
    groupId = 2; // agency
  } else {
    groupId = 3; // individual
  }

  // 1. Attempt to create the user. Supabase will handle the check for existing emails.
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: tempPassword,
    email_confirm: true, // Auto-confirm email for immediate login
    user_metadata: {
      name: name,
      plan: plan,
      password_is_temporary: true,
      group_id: groupId
    }
  });

  if (authError) {
    console.error('Supabase user creation error:', authError);
    // Check if the error is because the user already exists
    if (authError.message.includes('already registered')) {
      return {
        success: false,
        message: 'This email address is already registered. Please try logging in.',
      };
    }
    return {
      success: false,
      message: 'Could not create user. Please try again later.',
    };
  }

  if (!authData.user) {
     return {
      success: false,
      message: 'An unexpected error occurred during user creation.',
    };
  }

  // 2. Send welcome email
  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Welcome to precasprep - Your ${plan} Plan`,
      react: WelcomeEmail({ name, email, plan, tempPassword }),
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    // If email fails, it's critical to let the user know, and we should delete the created user
    // to allow them to try again cleanly.
    await supabase.auth.admin.deleteUser(authData.user.id);
    return {
      success: false,
      message: `We couldn't send your welcome email. Your order was not completed. Please check your email address and try again.`,
    };
  }

  // 3. On success, we don't redirect from the server action. 
  // We return a success status, and the client will handle the redirect.
  return {
    success: true,
    message: 'User created successfully.'
  };
}
