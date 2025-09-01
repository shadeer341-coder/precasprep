import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="A student preparing for an interview"
        data-ai-hint="student interview"
        fill
        priority
        className="object-cover object-center -z-10 brightness-50"
      />
      <div className="container px-4 md:px-6 text-white">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Ace Your University Interviews with AI
          </h1>
          <p className="text-lg text-gray-200 md:text-xl">
            Our platform provides AI-driven practice, real-time feedback, and camera validation to help you succeed.
          </p>
          <div className="pt-6">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/practice">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
