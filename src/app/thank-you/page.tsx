
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage({ searchParams }: { searchParams: { name?: string; email?: string } }) {
    const { name, email } = searchParams;

    return (
        <div className="flex min-h-[100dvh] flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <div className="mx-auto bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-fit">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold mt-4">Thank You, {name || 'Valued Customer'}!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            Your registration was successful. Your username and password have been sent to your email address at <strong className="text-foreground">{email}</strong>.
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Please check your inbox (and spam folder) to complete your setup.
                        </p>
                        <Button asChild>
                            <Link href="/login">Proceed to Login</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
