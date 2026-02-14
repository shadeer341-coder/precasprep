
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center">
            <Image 
              src="/precasprep-logo.webp" 
              alt="precasprep logo" 
              width={120} 
              height={30} 
              className="block dark:hidden"
            />
            <Image 
              src="/precasprep-logo-dark.webp" 
              alt="precasprep logo" 
              width={120} 
              height={30} 
              className="hidden dark:block"
            />
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} precasprep. All Rights Reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
            <Link href="/terms-and-conditions" className="transition-colors hover:text-foreground">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="transition-colors hover:text-foreground">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
