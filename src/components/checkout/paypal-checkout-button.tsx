
'use client';

import {
  PayPalButtons,
  OnApproveData,
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnClickData,
  OnClickActions,
} from '@paypal/react-paypal-js';
import { useToast } from '@/hooks/use-toast';

interface PayPalCheckoutButtonProps {
  createOrder: (data: CreateOrderData, actions: CreateOrderActions) => Promise<string>;
  onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void>;
  onClick: (data: OnClickData, actions: OnClickActions) => Promise<any> | void;
  onCancel: () => void;
}

const PayPalCheckoutButton = ({ 
  createOrder, 
  onApprove,
  onClick,
  onCancel,
}: PayPalCheckoutButtonProps) => {
  const { toast } = useToast();

  const onError = (err: any) => {
    console.error('PayPal Buttons onError:', err);
    toast({ 
        variant: 'destructive', 
        title: 'PayPal Error', 
        description: 'A payment error occurred. Please refresh and try again or contact support.'
    });
  };

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: 'vertical', label: 'pay' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onClick={onClick}
        onCancel={onCancel}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
