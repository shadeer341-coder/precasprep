import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold text-lg">interviewing.io</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          <Link href="#about" className="text-foreground/80 transition-colors hover:text-foreground">
            Watch interviews
          </Link>
          <Link href="#pricing" className="text-foreground/80 transition-colors hover:text-foreground">
            FAQ
          </Link>
          <Link href="#contact" className="text-foreground/80 transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="#">Log in</Link>
          </Button>
          <Button asChild className="font-bold">
            <Link href="/practice">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
