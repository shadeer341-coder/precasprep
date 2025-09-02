import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Practice and ace interviews
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Get anonymous mock interviews with engineers from Google, Meta, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="font-bold">
                <Link href="/practice">Get started for free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-bold">
                <Link href="#">Book a session</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://picsum.photos/600/400"
              alt="Person in a mock interview session"
              data-ai-hint="interview session"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
