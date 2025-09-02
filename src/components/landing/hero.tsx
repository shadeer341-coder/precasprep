import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl relative">
              <span className="relative">
                <span className="absolute inset-x-0 bottom-1.5 md:bottom-2.5 lg:bottom-3.5 h-3 md:h-4 lg:h-5 bg-accent/50 -z-10"></span>
                Prepare &amp; ace
              </span>{' '}
              <span className="relative">
                <span className="absolute inset-x-0 bottom-1.5 md:bottom-2.5 lg:bottom-3.5 h-3 md:h-4 lg:h-5 bg-accent/50 -z-10"></span>
                your interviews at
              </span>{' '}
              top companies.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Get anonymous technical mock interviews with engineers from Google, Facebook, and other top companies.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                <Link href="/practice">Get cracking</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://picsum.photos/600/400"
              alt="Two people shaking hands after a successful interview"
              data-ai-hint="interview handshake"
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
