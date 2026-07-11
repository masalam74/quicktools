import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — QuickTools',
  description: 'Terms of Service for QuickTools. Read our terms and conditions for using our free online tools.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-bold">
              Q
            </div>
            <span className="font-bold text-lg">QuickTools</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using QuickTools (available at quicktools-tau.vercel.app), you accept
                and agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our website or tools.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
              <p>
                QuickTools provides a collection of free online utility tools including, but not limited
                to, word counter, lorem ipsum generator, JSON formatter, case converter, password
                generator, Base64 encoder/decoder, URL encoder/decoder, and color picker/converter.
                All tools are provided as-is and are accessible free of charge.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Use of Tools</h2>
              <p>You may use QuickTools for personal and commercial purposes subject to the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  You will not use the tools for any unlawful purpose or in violation of any applicable
                  laws or regulations.
                </li>
                <li>
                  You will not attempt to interfere with or disrupt the integrity or performance of the
                  website or its tools.
                </li>
                <li>
                  You will not use automated systems (bots, scrapers, etc.) to access the tools in a
                  manner that places excessive load on our servers.
                </li>
                <li>
                  You understand that all tool processing occurs in your browser and we do not store or
                  transmit your input data.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Intellectual Property</h2>
              <p>
                The QuickTools website, including its design, code, graphics, and content, is owned by
                QuickTools and is protected by applicable intellectual property laws. You may not copy,
                modify, distribute, or create derivative works from the website without our prior written
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Disclaimer of Warranties</h2>
              <p>
                QuickTools is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without
                warranties of any kind, either express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>The tools will be available at all times without interruption.</li>
                <li>The results produced by the tools will be error-free or accurate.</li>
                <li>The website will be free of viruses or other harmful components.</li>
              </ul>
              <p className="mt-3">
                You acknowledge that you use the tools at your own risk and that any reliance on the
                results produced is at your sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, QuickTools and its operators shall not
                be liable for any direct, indirect, incidental, special, consequential, or punitive
                damages arising out of or in connection with your use of the tools or website. This
                includes, but is not limited to, damages for loss of data, revenue, or profits.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Privacy</h2>
              <p>
                Your use of QuickTools is also governed by our{' '}
                <a href="/privacy" className="text-emerald-600 hover:underline">
                  Privacy Policy
                </a>
                , which describes how we handle your information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible
                for the content, privacy practices, or terms of service of any third-party websites. You
                access third-party links at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to update or modify these Terms of Service at any time. Changes
                will be effective immediately upon posting on this page. Your continued use of the
                website after any changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">10. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:{' '}
                <a href="mailto:technosupportnow@gmail.com" className="text-emerald-600 hover:underline">
                  technosupportnow@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/30 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} QuickTools. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a>
              <a href="/about" className="hover:text-foreground transition-colors">About Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}