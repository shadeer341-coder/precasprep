
'use client';

import { Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import PayPalCheckoutButton from '@/components/checkout/paypal-checkout-button';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
});

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || '0';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  });

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const getFormData = useCallback(() => {
    return form.getValues();
  }, [form]);

  if (!paypalClientId) {
    return <p>Could not load payment provider. Please contact support.</p>;
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>You are purchasing the following plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{planName}</span>
              <span className="text-lg font-bold">${price}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>${price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Enter your name and email to proceed.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Full Name</Label>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email Address</Label>
                      <FormControl>
                        <Input id="email" type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>

        <div>
          <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'capture' }}>
              <PayPalCheckoutButton
                  planName={planName}
                  price={price}
                  getFormData={getFormData}
                  disabled={!form.formState.isValid}
              />
          </PayPalScriptProvider>
          { !form.formState.isValid && <p className="text-center text-sm text-muted-foreground mt-2">Please fill out your details to pay with PayPal.</p> }
        </div>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-background p-4 md:p-8">
         <Suspense fallback={<div>Loading...</div>}>
            <CheckoutForm />
         </Suspense>
      </main>
      <Footer />
    </div>
  );
}
