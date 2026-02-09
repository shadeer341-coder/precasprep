'use client';

import { useState, useCallback, useEffect } from 'react';
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

type PaymentStatus = 'idle' | 'processing' | 'approved' | 'error';

const PayPalCheckoutButton = ({ planName, price, name, email, disabled }: PayPalCheckoutButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [orderID, setOrderID] = useState<string | null>(null);

  const handleCreateOrder = useCallback(
    (data: CreateOrderData, actions: CreateOrderActions) => {
      setError(null);
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
                value: parsedPrice.toFixed(2),
                currency_code: 'USD',
              },
            },
          ],
          application_context: {
            shipping_preference: 'NO_SHIPPING',
          },
        });
      } catch (error) {
        console.error('Client-side error during order creation:', error);
        setError(
          'An error occurred while preparing your order. Please check the details and try again.'
        );
        toast({
          variant: 'destructive',
          title: 'Order Creation Error',
          description: 'Could not prepare your order for PayPal.',
        });
        return Promise.reject(error);
      }
    },
    [price, planName, toast]
  );

  const handleOnApprove = useCallback(
    async (data: OnApproveData, actions: OnApproveActions) => {
      if (!actions.order) {
        setError('Could not capture the order. Please contact support.');
        toast({
          variant: 'destructive',
          title: 'Payment Error',
          description: 'Could not capture the order.',
        });
        return;
      }

      try {
        const order = await actions.order.capture();
        console.log('PayPal Order Captured, starting server processing:', order);
        setOrderID(data.orderID);
        setPaymentStatus('approved');
        setIsProcessing(true); // Show spinner while server action runs
      } catch (err) {
        console.error('Error capturing order:', err);
        setError('Failed to capture payment from PayPal. Please try again.');
        toast({
          variant: 'destructive',
          title: 'Payment Capture Error',
          description: "We couldn't finalize your payment with PayPal.",
        });
        setPaymentStatus('error');
      }
    },
    [toast]
  );

  useEffect(() => {
    if (paymentStatus === 'approved' && orderID) {
      const runProcessOrder = async () => {
        const result = await processOrder({
          name,
          email,
          plan: planName,
          orderId: orderID,
        });

        if (result.success) {
          toast({
            title: 'Payment Successful!',
            description: 'Your account has been created. Redirecting...',
          });
          router.push(
            `/thank-you?name=${encodeURIComponent(
              name
            )}&email=${encodeURIComponent(email)}`
          );
        } else {
          setError(result.message);
          toast({
            variant: 'destructive',
            title: 'Account Creation Failed',
            description: result.message,
          });
          setIsProcessing(false); // Stop spinner on failure
          setPaymentStatus('error');
        }
      };

      runProcessOrder();
    }
  }, [paymentStatus, orderID, name, email, planName, router, toast]);

  const handleOnError = useCallback(
    (err: any) => {
      console.error('PayPal onError callback triggered:', err);
      
      if (err && err.message && err.message.includes('Window closed')) {
        console.log('Payment window was closed by the user.');
        return; 
      }

      const errorMessage =
        'An error occurred with the PayPal payment. Please try again or contact support.';

      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'PayPal Payment Error',
        description: errorMessage,
      });
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
