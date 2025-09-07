
'use client';

import { useActionState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { submitPricingForm } from '@/app/pricing/actions';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

export function PricingDialog({ open, onOpenChange, planName }: PricingDialogProps) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(submitPricingForm, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
      setIsSubmitting(false);
    }
  }, [state, toast]);
  
  useEffect(() => {
    // Reset submitting state when dialog opens or closes
    setIsSubmitting(false);
  }, [open]);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    dispatch(formData);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Started with the {planName} Plan</DialogTitle>
          <DialogDescription>
            Just a few details and you'll be on your way to acing your interviews.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <input type="hidden" name="plan" value={planName} />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" required />
          </div>
          {state.errors?.name && (
            <p className="col-span-4 text-destructive text-sm text-right -mt-2">{state.errors.name[0]}</p>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" className="col-span-3" required />
          </div>
           {state.errors?.email && (
            <p className="col-span-4 text-destructive text-sm text-right -mt-2">{state.errors.email[0]}</p>
          )}
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit and Proceed
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
