import Link from "next/link";
import { GraduationCap, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">InterviewAce</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} InterviewAce. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
