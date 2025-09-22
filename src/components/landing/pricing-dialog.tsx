
'use client';

import { useActionState, useEffect } from 'react';
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
import { submitPricingForm, type FormState } from '@/app/pricing/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

export function PricingDialog({ open, onOpenChange, planName }: PricingDialogProps) {
  const initialState: FormState = { message: '', errors: {} };
  const [state, formAction, isPending] = useActionState(submitPricingForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    // This effect will show a toast for general server errors that aren't specific to a field.
    if (state?.message && state.errors?._form) {
       toast({
        variant: 'destructive',
        title: 'Sign-up Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Started with the {planName} Plan</DialogTitle>
          <DialogDescription>
            Just a few details and you'll be on your way to acing your interviews.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4">
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

          {state.errors?._form && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {state.errors._form[0]}
                </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
             {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit and Proceed
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
