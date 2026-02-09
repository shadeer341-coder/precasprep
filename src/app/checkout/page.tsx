'use client';

import { Suspense, useCallback, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PayPalScriptProvider, OnApproveData, CreateOrderData, CreateOrderActions, OnApproveActions, OnClickData, OnClickActions } from '@paypal/react-paypal-js';

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import PayPalCheckoutButton from '@/components/checkout/paypal-checkout-button';
import { processOrder } from '@/app/checkout/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
});

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const planName = searchParams.get('plan') || 'N/A';
  const price = searchParams.get('price') || '0';

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  });

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!paypalClientId) {
    return <p>Could not load payment provider. Please contact support.</p>;
  }

  const createOrder = useCallback((data: CreateOrderData, actions: CreateOrderActions) => {
    setError(null);
    return actions.order.create({
      purchase_units: [
        {
          description: `precasprep - ${planName} Plan`,
          amount: {
            currency_code: 'USD',
            value: parseFloat(price).toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  }, [planName, price]);

  const onApprove = useCallback(async (data: OnApproveData, actions: OnApproveActions) => {
    setIsProcessing(true);
    setError(null);

    try {
      if (!actions.order) {
        throw new Error('Order actions not available. Please try again.');
      }
      
      const order = await actions.order.capture();
      const { name, email } = form.getValues();
      
      const userCreationResult = await processOrder({
        name,
        email,
        plan: planName,
        orderId: order.id,
      });

      if (userCreationResult.success) {
        toast({
          title: 'Payment Successful!',
          description: 'Your account has been created. Redirecting...',
        });
        router.push(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
      } else {
        const errorMessage = `Your payment was successful, but we couldn't complete your registration. Please contact support with Order ID: ${order.id}. Reason: ${userCreationResult.message}`;
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Account Registration Failed',
          description: errorMessage,
          duration: 30000, 
        });
        setIsProcessing(false);
      }

    } catch (captureError: any) {
      console.error('Error during PayPal checkout:', captureError);
      
      if (captureError.message && captureError.message.includes('Window closed')) {
         // This can happen if the user manually closes the PayPal window.
         // onCancel will handle the user-facing toast message.
      } else {
        const errorMessage = "Your payment could not be processed. Please try again or use a different payment method.";
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: errorMessage,
        });
      }
      setIsProcessing(false);
    }
  }, [form, planName, router, toast]);
  
  const handleOnClick = useCallback((data: OnClickData, actions: OnClickActions) => {
    if (!form.formState.isValid) {
      toast({
        variant: "destructive",
        title: "Invalid Details",
        description: "Please fill out your name and email before proceeding to payment.",
      });
      return actions.reject();
    }
    return actions.resolve();
  }, [form, toast]);

  const handleOnCancel = useCallback(() => {
    console.log("PayPal payment cancelled by user.");
    toast({
        title: 'Payment Cancelled',
        description: 'You have cancelled the payment process.',
    });
  }, [toast]);

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

        <div className="w-full">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-md min-h-[76px]">
              <div className="flex items-center">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Processing your order...</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Please do not close this window.</p>
            </div>
          ) : (
            <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD', intent: 'capture' }}>
                <PayPalCheckoutButton
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onClick={handleOnClick}
                    onCancel={handleOnCancel}
                />
            </PayPalScriptProvider>
          )}

          {error && (
            <p className="text-destructive text-sm mt-2 text-center">{error}</p>
          )}

          { !isProcessing && !form.formState.isValid && <p className="text-center text-sm text-muted-foreground mt-2">Please fill out your details to pay with PayPal.</p> }
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
