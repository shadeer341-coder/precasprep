import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20 lg:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <article className="prose dark:prose-invert max-w-none">
            <h1>Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Welcome to precasprep ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <h2>1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <h3>Personal Data</h3>
            <p>Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register for an account or choose to participate in various activities related to the Site, such as online chat and message boards.</p>
            <h3>Audio and Video Data</h3>
            <p>When you participate in an interview practice session, we collect your audio and video recordings. This data is essential for our experts to provide you with personalized feedback and analysis. These recordings are stored securely and are only accessed for the purpose of review and feedback.</p>
            <h3>Financial Data</h3>
            <p>We do not collect or store any payment or card information. All financial transactions are processed through our third-party payment processors. We recommend you review the privacy policy of the respective payment processor.</p>
            <h3>Derivative Data</h3>
            <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>

            <h2>2. How We Use Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
                <li>Create and manage your account.</li>
                <li>Process your payments and refunds.</li>
                <li>Provide you with the core service of interview practice and expert feedback.</li>
                <li>Email you regarding your account or order.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                <li>Notify you of updates to the Site.</li>
            </ul>

            <h2>3. Disclosure of Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <h3>By Law or to Protect Rights</h3>
            <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>
            <h3>Third-Party Service Providers</h3>
            <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.</p>
            <h3>Business Transfers</h3>
            <p>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>

            <h2>4. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
            
            <h2>5. Your Rights Regarding Your Information</h2>
            <p>You have the right to access, correct, or delete your personal data. You can manage your account information by logging into your account settings. If you wish to delete your account and all associated data, please contact us at the contact information below.</p>

            <h2>6. Policy for Children</h2>
            <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
            
            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            
            <h2>8. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us through the contact form on our website.</p>
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
              .prose h3 {
                  font-size: 1.25rem;
                  line-height: 1.75rem;
                  font-weight: 600;
                  margin-top: 1.5em;
                  margin-bottom: 0.5em;
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
              .prose ul {
                list-style-position: inside;
                padding-left: 0;
              }
          `}</style>
        </div>
      </main>
      <Footer />
    </div>
  );
}