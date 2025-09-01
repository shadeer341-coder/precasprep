import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">InterviewAce</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          <Link href="#about" className="text-foreground/60 transition-colors hover:text-foreground/80">
            About
          </Link>
          <Link href="#pricing" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Testimonials
          </Link>
          <Link href="#contact" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/practice">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
