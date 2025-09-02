import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Prepare &amp; ace your interviews at top companies.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Get anonymous technical mock interviews with engineers from Google, Facebook, and other top companies.
            </p>
            <div className="pt-4">
              <Button size="lg" asChild className="font-bold">
                <Link href="/practice">Get cracking</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://picsum.photos/600/400"
              alt="Person looking at a map"
              data-ai-hint="map journey"
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
