
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

function RedirectLoader() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="text-center">
                <p className="text-lg text-muted-foreground">Redirecting to login...</p>
            </div>
        </div>
    )
}

export default function LoginPage() {
  redirect('https://app.precasprep.com');
  
  // This part will not be rendered due to the redirect, 
  // but it's good practice to have a fallback UI.
  return (
    <Suspense fallback={<RedirectLoader />}>
       <RedirectLoader />
    </Suspense>
  );
}
