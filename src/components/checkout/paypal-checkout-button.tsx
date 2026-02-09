
'use client';

import { useState, useCallback } from 'react';
import { 
    PayPalButtons, 
    OnApproveData, 
    CreateOrderData, 
    CreateOrderActions, 
    OnApproveActions 
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

  const handleCreateOrder = useCallback((data: CreateOrderData, actions: CreateOrderActions) => {
    console.log("Attempting to create PayPal order...");
    console.log("Data received:", { price, planName });

    try {
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice) || parsedPrice <= 0) {
        const err = "Invalid price. Please select a valid plan.";
        console.error(err, { price });
        setError(err);
        toast({
          variant: "destructive",
          title: "Invalid Price",
          description: "The price for the selected plan is invalid.",
        });
        return Promise.reject(new Error(err));
      }

      const orderPayload = {
        purchase_units: [
          {
            description: `precasprep - ${planName} Plan`,
            amount: {
              value: parsedPrice.toFixed(2),
              currency_code: 'USD',
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        }
      };

      console.log("Creating order with payload:", JSON.stringify(orderPayload, null, 2));

      return actions.order.create(orderPayload);
    } catch (error) {
      console.error("Caught error during order creation:", error);
      setError("A client-side error occurred before creating the order. Check the console.");
      toast({
        variant: "destructive",
        title: "Client Error",
        description: "An error occurred while preparing your order.",
      });
      return Promise.reject(error);
    }
  }, [price, planName, toast]);

  const handleOnApprove = useCallback(async (data: OnApproveData, actions: OnApproveActions) => {
    if (!actions.order) {
      setError("Could not capture the order. Please contact support.");
      toast({ variant: 'destructive', title: 'Payment Error', description: 'Could not capture the order.' });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const order = await actions.order.capture();
      console.log('PayPal Order Captured:', order);

      const result = await processOrder({
        name,
        email,
        plan: planName,
        orderId: data.orderID,
      });

      if (result.success) {
        toast({
          title: 'Payment Successful!',
          description: 'Your account has been created. Redirecting...',
        });
        router.push(`/thank-you?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
      } else {
        setError(result.message);
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.message,
        });
      }
    } catch (err: any) {
        setError('An unexpected error occurred during payment processing.');
        toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: 'Failed to process payment. Please try again.',
        });
        console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [name, email, planName, router, toast]);

  const handleOnError = useCallback((err: any) => {
    console.error('PayPal onError callback triggered:', err);
    let errorMessage = 'An error occurred with the PayPal payment. Please check your details and try again.';
    
    // Try to get a more specific message if available
    if (err && err.message) {
        errorMessage = err.message;
    }

    setError(errorMessage);
    toast({
        variant: 'destructive',
        title: 'PayPal Payment Error',
        description: "Something went wrong. Check the developer console for more details.",
    });
  }, [toast]);

  return (
    <div className="w-full">
      {isProcessing ? (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Processing your order...</span>
        </div>
      ) : (
        <PayPalButtons
          key={planName + price}
          style={{ layout: 'vertical', label: 'pay' }}
          createOrder={handleCreateOrder}
          onApprove={handleOnApprove}
          onError={handleOnError}
          disabled={isProcessing || disabled}
        />
      )}
      {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};

export default PayPalCheckoutButton;
