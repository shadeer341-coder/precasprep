import { Header } from '@/components/landing/header';
import { PracticeSession } from '@/components/practice/practice-session';
import { Footer } from '@/components/landing/footer';

export default function PracticePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <PracticeSession />
      </main>
      <Footer />
    </div>
  );
}
