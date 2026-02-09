
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
  getFormData: () => { name: string; email: string };
  disabled: boolean;
}

const PayPalCheckoutButton = ({ planName, price, getFormData, disabled }: PayPalCheckoutButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(
    (data: CreateOrderData, actions: CreateOrderActions) => {
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
    },
    [price, planName]
  );

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    setIsProcessing(true);
    setError(null);

    try {
      if (!actions.order) {
        throw new Error('Order actions not available. Please try again.');
      }
      
      const order = await actions.order.capture();
      
      // At this point, the payment is captured. PayPal is happy.
      // Now, we handle our own server-side logic.
      
      const { name, email } = getFormData();
      
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
        // This case handles when payment succeeded but our user creation failed (e.g., duplicate email).
        const errorMessage = `Your payment was successful, but we couldn't complete your registration. Please contact support with Order ID: ${order.id}. Reason: ${userCreationResult.message}`;
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Account Registration Failed',
          description: errorMessage,
          duration: 30000, 
        });
      }

    } catch (captureError: any) {
      console.error('Error during PayPal checkout:', captureError);
      
      // Special handling for user-cancelled payments, which shouldn't show a big error.
      if (captureError.message && (captureError.message.includes('Window closed') || captureError.message.includes('cross-domain error'))) {
        // User likely closed the window manually. Don't show an error.
        setError(null);
      } else {
        const errorMessage = "Your payment could not be processed. Please try again or use a different payment method.";
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: errorMessage,
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  const onError = (err: any) => {
    // This handler is for errors that occur *before* onApprove, e.g., if the popup fails to open.
    // The "Window closed" error you're seeing happens during onApprove, so it's caught there now.
    console.error('PayPal Buttons onError:', err);
    setError('An unexpected error occurred with PayPal. Please refresh the page and try again.');
    toast({ variant: 'destructive', title: 'PayPal Error', description: 'Could not initialize PayPal checkout.' });
    setIsProcessing(false);
  };

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
            key={planName + price}
            style={{ layout: 'vertical', label: 'pay' }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
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
