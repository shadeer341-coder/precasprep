
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

  const handleCreateOrder = useCallback(
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

  const handleOnApprove = useCallback(
    async (data: OnApproveData, actions: OnApproveActions) => {
      if (!actions.order) {
        toast({ variant: 'destructive', title: 'Payment Error', description: 'Could not find order actions.' });
        return;
      }
      
      setIsProcessing(true);
      setError(null);

      try {
        const order = await actions.order.capture();
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
           const errorMessage = `Your payment was successful, but we couldn't complete your registration. Please contact support with Order ID: ${order.id}. Reason: ${userCreationResult.message}`;
          setError(errorMessage);
          toast({
            variant: 'destructive',
            title: 'Account Registration Failed',
            description: errorMessage,
            duration: 30000, 
          });
        }

      } catch (captureError) {
        console.error('Error capturing PayPal order:', captureError);
        const errorMessage = "Your payment could not be processed. Please try again or use a different payment method.";
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: errorMessage,
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [getFormData, planName, router, toast]
  );
  
  const handleOnError = useCallback(
    (err: any) => {
      console.error('PayPal onError callback triggered:', err);
      // Ignore errors from the user closing the window
      if (err && err.message && (err.message.includes('Window closed') || err.message.includes('cross-domain error'))) {
        return; 
      }
      const errorMessage = 'An unexpected error occurred with PayPal. Please try again or contact support.';
      setError(errorMessage);
      toast({ variant: 'destructive', title: 'PayPal Payment Error', description: errorMessage });
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
            key={planName + price}
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
