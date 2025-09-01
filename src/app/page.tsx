import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { Pricing } from '@/components/landing/pricing';
import { Testimonials } from '@/components/landing/testimonials';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
