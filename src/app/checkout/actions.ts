
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
  price: z.number().positive('Price must be a positive number.'),
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
  
  const { name, email, plan, price } = validatedFields.data;

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
    // Check if the error is because the user already exists (HTTP 409 Conflict)
    if (authError.status === 409) {
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

  // 2. Insert into purchases table
  let attempts: number | null;
  if (plan.toLowerCase().includes('agency - starter')) {
    attempts = 10;
  } else if (plan.toLowerCase().includes('agency - standard')) {
    attempts = 25;
  } else if (plan.toLowerCase().includes('agency - advanced')) {
    attempts = 50;
  } else { // Individual plan
    attempts = null; // Represents unlimited
  }

  const { error: purchaseError } = await supabase.from('purchases').insert({
    user_id: authData.user.id,
    amount_spent: price,
    attempts: attempts,
    purpose: 'register',
    given_to: null,
  });

  if (purchaseError) {
    console.error('Supabase purchase insertion error:', purchaseError);
    // User was created but purchase record failed. The client-side will show a generic error
    // telling the user to contact support with their Order ID.
    // We are not deleting the user here because payment has already been captured.
    return {
      success: false,
      message: 'Could not record purchase details.',
    };
  }


  // 3. Send welcome email
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
    // If email fails, the user and purchase are already created.
    // The client-side will show an error guiding them to support.
    return {
      success: false,
      message: `We couldn't send your welcome email, but your account is created. Please contact support to get your login details.`,
    };
  }

  // 4. On success, we don't redirect from the server action. 
  // We return a success status, and the client will handle the redirect.
  return {
    success: true,
    message: 'User created and purchase recorded successfully.',
  };
}
