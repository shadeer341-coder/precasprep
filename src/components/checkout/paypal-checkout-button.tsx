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
      if (!actions.order) {
        const errorMessage = 'Could not capture the order. Please contact support.';
        setError(errorMessage);
        toast({ variant: 'destructive', title: 'Payment Error', description: errorMessage });
        return;
      }

      setIsProcessing(true);

      // 1. Attempt to create the user BEFORE capturing payment
      const userCreationResult = await processOrder({
        name,
        email,
        plan: planName,
        orderId: data.orderID,
      });

      // 2. If user creation fails, show error and STOP. Do not capture payment.
      if (!userCreationResult.success) {
        setError(userCreationResult.message);
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: userCreationResult.message,
        });
        setIsProcessing(false);
        return;
      }

      // 3. If user creation is successful, THEN capture the payment.
      try {
        const order = await actions.order.capture();
        console.log('PayPal Order Captured, user created successfully:', order);
        
        toast({
          title: 'Payment Successful!',
          description: 'Your account has been created. Redirecting...',
        });
        router.push(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
      } catch (captureError) {
        console.error('Error capturing order after user creation:', captureError);
        const errorMessage = "Your payment was approved but we couldn't finalize it. Please contact support. Your account was created but payment failed.";
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Payment Capture Error',
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
      if (err && err.message && err.message.includes('Window closed')) {
        console.log('Payment window was closed by the user.');
        setIsProcessing(false); // Make sure to stop spinner if user cancels
        return; 
      }

      const errorMessage = 'An error occurred with the PayPal payment. Please try again or contact support.';
      setError(errorMessage);
      toast({ variant: 'destructive', title: 'PayPal Payment Error', description: errorMessage });
      setIsProcessing(false);
    },
    [toast]
  );

  return (
    <div className="w-full">
      {isProcessing ? (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md h-[76px]">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Processing your order...</span>
        </div>
      ) : (
        <>
          <PayPalButtons
            key={planName + price + name + email} // Force re-render when details change
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
