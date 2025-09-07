
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M21.284 1.442a3.003 3.003 0 0 0-2.079.718L3.34 17.51a2.986 2.986 0 0 0-.15 4.39 3.003 3.003 0 0 0 4.22.16l15.865-15.35a3 3 0 0 0-2.001-5.268Z"
      fill="currentColor"
    />
    <path
      d="M3.73 1.442a3.003 3.003 0 0 1 2.079.718l15.865 15.35a2.986 2.986 0 0 1 .15 4.39 3.003 3.003 0 0 1-4.22.16L1.72 6.709a3 3 0 0 1 2.01-5.268Z"
      fill="currentColor"
      fillOpacity=".5"
    />
  </svg>
);


export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center px-4 md:px-6">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-lg">precasprep</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          <Link href="/#about" className="text-foreground/80 transition-colors hover:text-foreground">
            Why Choose Us?
          </Link>
          <Link href="/#pricing" className="text-foreground/80 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#testimonials" className="text-foreground/80 transition-colors hover:text-foreground">
            Reviews
          </Link>
          <Link href="/#contact" className="text-foreground/80 transition-colors hover:text-foreground">
            Contact Us
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden flex-1 items-center justify-end space-x-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className="font-bold">
            <Link href="/login">Sign up</Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                 <Link href="/#about" className="text-foreground/80 transition-colors hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                    Why Choose Us?
                  </Link>
                  <Link href="/#pricing" className="text-foreground/80 transition-colors hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                    Pricing
                  </Link>
                  <Link href="/#testimonials" className="text-foreground/80 transition-colors hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                    Reviews
                  </Link>
                  <Link href="/#contact" className="text-foreground/80 transition-colors hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                    Contact Us
                  </Link>
                  <div className="space-y-4 pt-4">
                    <Button variant="ghost" asChild className="w-full justify-start">
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="font-bold w-full">
                        <Link href="/login">Sign up</Link>
                    </Button>
                  </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
