
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Precasprep - AI-Powered University Interview Practice',
  description: 'Ace your university admissions with Precasprep. Get AI-powered mock interviews, instant feedback, and real-time analytics to boost your confidence and performance.',
  keywords: ['AI interview practice', 'university admissions', 'mock interviews', 'college prep', 'interview feedback'],
  openGraph: {
    title: 'Precasprep - AI-Powered University Interview Practice',
    description: 'Ace your university admissions with Precasprep. Get AI-powered mock interviews, instant feedback, and real-time analytics to boost your confidence and performance.',
    url: 'https://precasprep.com', // Replace with your actual domain
    siteName: 'Precasprep',
    images: [
      {
        url: 'https://ovktxfetpzfduhecbjek.supabase.co/storage/v1/object/public/public-main-index/og-image.png', // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: 'Precasprep - Practice and Ace University Interviews',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precasprep - AI-Powered University Interview Practice',
    description: 'Ace your university admissions with Precasprep. Get AI-powered mock interviews, instant feedback, and real-time analytics to boost your confidence and performance.',
    images: ['https://ovktxfetpzfduhecbjek.supabase.co/storage/v1/object/public/public-main-index/og-image.png'], // Replace with your Twitter image URL
  },
  icons: {
    icon: 'https://ovktxfetpzfduhecbjek.supabase.co/storage/v1/object/public/public-main-index/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{scrollBehavior:'smooth'}} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
