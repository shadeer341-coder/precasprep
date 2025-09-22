
"use client";

import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 lg:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <article className="prose dark:prose-invert max-w-none">
            <h1>Terms and Conditions</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the precasprep website (the "Service") operated by precasprep ("us", "we", or "our").</p>
            <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>

            <h2>1. Accounts</h2>
            <p>When you create an account with us, you guarantee that you are above the age of 13, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
            <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password. Upon registration, you may be provided with a temporary password. You are required to change this temporary password upon your first login to ensure the security of your account.</p>

            <h2>2. Service Usage</h2>
            <p>Precasprep provides a platform for university interview practice. This includes access to mock interview questions, the ability to record your responses via audio and video, and access to feedback from our team of experts.</p>
            <p>You agree not to use the service for any purpose that is illegal or prohibited by these Terms. You are responsible for all of your activity in connection with the Service.</p>

            <h2>3. Payments and Subscriptions</h2>
            <p>Certain features of the Service are billed on a subscription basis ("Subscription(s)") or as a one-time purchase. You will be billed in advance on a recurring, periodic basis for subscriptions, or at the time of purchase for one-time plans.</p>
            <p>All payments are handled by a third-party payment processor. We do not store your payment information. By submitting your payment information, you grant us the right to provide the information to these third parties, subject to our Privacy Policy.</p>
            
            <h2>4. User Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"), specifically your audio and video recordings of practice interviews. You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
            <p>By posting Content on or through the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service for the sole purpose of providing feedback and improving our services. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>
            
            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of precasprep and its licensors. The Service is protected by copyright, trademark, and other laws of both the foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of precasprep.</p>
            
            <h2>6. Limitation of Liability</h2>
            <p>In no event shall precasprep, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

            <h2>7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.</p>

            <h2>8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through the contact form on our website.</p>
          </article>
          <style jsx global>{`
              .prose h1 {
                  font-size: 2.25rem;
                  line-height: 2.5rem;
                  font-weight: 700;
                  margin-bottom: 0.5em;
              }
              .prose h2 {
                  font-size: 1.5rem;
                  line-height: 2rem;
                  font-weight: 600;
                  margin-top: 2em;
                  margin-bottom: 1em;
              }
              .prose p, .prose li {
                  line-height: 1.75;
                  color: hsl(var(--muted-foreground));
              }
              .dark .prose p, .dark .prose li {
                  color: hsl(var(--muted-foreground));
              }
              .prose a {
                  color: hsl(var(--primary));
                  text-decoration: none;
              }
              .prose a:hover {
                  text-decoration: underline;
              }
          `}</style>
        </div>
      </main>
      <Footer />
    </div>
  );
}
