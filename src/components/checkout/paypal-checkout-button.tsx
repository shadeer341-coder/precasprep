
'use client';

import { useState } from 'react';
import { PayPalButtons, OnApproveData, CreateOrderData } from '@paypal/react-paypal-js';
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

  const handleCreateOrder = (data: CreateOrderData, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `precasprep - ${planName} Plan`,
          amount: {
            value: price,
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      }
    });
  };

  const handleOnApprove = async (data: OnApproveData, actions: any) => {
    setIsProcessing(true);
    setError(null);

    try {
      // This step is not strictly necessary for order capture but can be useful for logging.
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
    } catch (err: any) { {
        setError('An unexpected error occurred during payment processing.');
        toast({
            variant: 'destructive',
            title: 'Payment Error',
            description: 'Failed to process payment. Please try again.',
        });
        console.error(err);
    }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOnError = (err: any) => {
    setError('An error occurred with the PayPal payment. Please check your details and try again.');
    toast({
        variant: 'destructive',
        title: 'PayPal Error',
        description: 'Something went wrong with the payment.',
    });
    console.error('PayPal Checkout Error:', err);
  };

  return (
    <div className="w-full">
      {isProcessing ? (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Processing your order...</span>
        </div>
      ) : (
        <PayPalButtons
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
