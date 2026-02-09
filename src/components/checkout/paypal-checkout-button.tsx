
'use client';

import {
  PayPalButtons,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
} from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';

interface PayPalCheckoutButtonProps {
  disabled: boolean;
  createOrder: (data: CreateOrderData, actions: CreateOrderActions) => Promise<string>;
  onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void>;
}

const PayPalCheckoutButton = ({ disabled, createOrder, onApprove }: PayPalCheckoutButtonProps) => {
  const { toast } = useToast();

  // This handler is for fatal errors with the PayPal script itself (e.g., network issues loading it)
  const onError = (err: any) => {
    console.error('PayPal Buttons onError:', err);
    toast({ 
        variant: 'destructive', 
        title: 'PayPal Error', 
        description: 'Could not initialize PayPal checkout. Please refresh the page and try again.' 
    });
  };

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: 'vertical', label: 'pay' }}
        disabled={disabled}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
