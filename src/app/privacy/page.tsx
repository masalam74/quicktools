import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — QuickTools',
  description: 'Privacy Policy for QuickTools. Learn how we handle your data and privacy.',
};

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to QuickTools (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website
                quicktools-tau.vercel.app. This Privacy Policy explains how we collect, use, and protect
                information when you use our website and tools.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">2. Information We Collect</h2>
              <p className="mb-2">
                <strong>We do NOT collect any personal data.</strong> Our tools run entirely in your browser.
                No text, files, or data you enter into any tool is sent to our servers.
              </p>
              <p>
                All processing happens locally on your device. Your data stays on your computer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">3. Third-Party Services</h2>
              <p className="mb-2">We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google AdSense:</strong> We display advertisements provided by Google AdSense.
                  Google may use cookies and web beacons to serve ads based on your prior visits to our
                  website or other websites. You can opt out of personalized advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Google Ads Settings
                  </a>.
                </li>
                <li>
                  <strong>Google Analytics:</strong> We may use Google Analytics to understand how visitors
                  interact with our website. Google Analytics collects information anonymously and reports
                  website trends without identifying individual visitors.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">4. Cookies</h2>
              <p className="mb-2">
                Third-party advertising companies (including Google) may use cookies to serve ads based on
                your browsing activity. These cookies enable the ad server to recognize your computer and
                display relevant advertisements.
              </p>
              <p>
                You can disable cookies through your browser settings. However, disabling cookies may
                affect your experience on our website and other websites.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">5. Data Security</h2>
              <p>
                Since we do not collect or store any personal data on our servers, there is no risk of
                personal data breach from our systems. All tool processing happens locally in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">6. Children&apos;s Privacy</h2>
              <p>
                Our website is not directed at children under 13. We do not knowingly collect personal
                information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the
                privacy practices or content of those websites. We encourage you to review the privacy
                policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this
                page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:technosupportnow@gmail.com" className="text-emerald-600 hover:underline">
                  technosupportnow@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} QuickTools. All rights reserved.
        </div>
      </footer>
    </div>
  );
}