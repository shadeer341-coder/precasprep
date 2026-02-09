
'use client';

import { useState, useCallback } from 'react';
import {
  PayPalButtons,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
} from '@paypal/react-paypal-js';
import { processOrder } from '@/app/checkout/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface PayPalCheckoutButtonProps {
  planName: string;
  price: string;
  name: string;
  email: string;
  disabled: boolean;
}

const PayPalCheckoutButton = ({ planName, price, name, email, disabled }: PayPalCheckoutButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOrder = useCallback(
    (data: CreateOrderData, actions: CreateOrderActions) => {
      setError(null);
      console.log('Creating PayPal order with price:', price);
      try {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
          throw new Error('Invalid price. Please select a valid plan.');
        }

        return actions.order.create({
          purchase_units: [
            {
              description: `precasprep - ${planName} Plan`,
              amount: {
                currency_code: 'USD',
                value: parsedPrice.toFixed(2),
              },
            },
          ],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
        });
      } catch (error) {
        const errorMessage = 'An error occurred while preparing your order. Please check the details and try again.';
        console.error('Client-side error during order creation:', error);
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Order Creation Error',
          description: errorMessage,
        });
        return Promise.reject(error);
      }
    },
    [price, planName, toast]
  );

  const handleOnApprove = useCallback(
    async (data: OnApproveData, actions: OnApproveActions) => {
      // This function is now structured to capture payment first.
      if (!actions.order) {
        const errorMessage = 'Could not process the order. Please contact support.';
        setError(errorMessage);
        toast({ variant: 'destructive', title: 'Payment Error', description: errorMessage });
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        // 1. Capture the payment immediately. This is fast and prevents timeouts.
        const order = await actions.order.capture();
        console.log('PayPal Order Captured:', order);
        
        // 2. Now that payment is secure, process the order (create user, send email).
        const userCreationResult = await processOrder({
          name,
          email,
          plan: planName,
          orderId: data.orderID,
        });

        // 3. Handle the result of order processing.
        if (userCreationResult.success) {
          toast({
            title: 'Payment Successful!',
            description: 'Your account has been created. Redirecting...',
          });
          router.push(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
        } else {
          // This is the critical failure case: payment succeeded, but account creation failed.
          const errorMessage = `Your payment was successful, but we couldn't complete your registration. Please contact support with Order ID: ${data.orderID}. Reason: ${userCreationResult.message}`;
          console.error('Post-payment account creation failed:', userCreationResult.message);
          setError(errorMessage);
          toast({
            variant: 'destructive',
            title: 'Account Registration Failed',
            description: errorMessage,
            duration: 30000, // Make toast more persistent
          });
          setIsProcessing(false);
        }

      } catch (captureError) {
        // This block now only handles failures in capturing the payment itself.
        console.error('Error capturing PayPal order:', captureError);
        const errorMessage = "Your payment could not be processed. Please try again or use a different payment method.";
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: errorMessage,
        });
        setIsProcessing(false);
      }
    },
    [name, email, planName, router, toast]
  );
  
  const handleOnError = useCallback(
    (err: any) => {
      console.error('PayPal onError callback triggered:', err);
      
      // This error often means the user closed the PayPal popup. We can safely ignore it.
      if (err && err.message && (err.message.includes('Window closed') || err.message.includes('cross-domain error'))) {
        console.log('Payment window was closed by the user or timed out.');
        setIsProcessing(false); // Make sure to stop spinner if user cancels
        return; 
      }

      const errorMessage = 'An unexpected error occurred with PayPal. Please try again or contact support.';
      setError(errorMessage);
      toast({ variant: 'destructive', title: 'PayPal Payment Error', description: errorMessage });
      setIsProcessing(false);
    },
    [toast]
  );

  return (
    <div className="w-full">
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-md h-[76px]">
          <div className="flex items-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Processing your order...</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Please do not close this window.</p>
        </div>
      ) : (
        <>
          <PayPalButtons
            key={planName + price + name + email + disabled} // Force re-render when details change
            style={{ layout: 'vertical', label: 'pay' }}
            createOrder={handleCreateOrder}
            onApprove={handleOnApprove}
            onError={handleOnError}
            disabled={disabled}
          />
          {error && (
            <p className="text-destructive text-sm mt-2 text-center">{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default PayPalCheckoutButton;
