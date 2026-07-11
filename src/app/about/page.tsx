import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — QuickTools',
  description: 'Learn about QuickTools — a free, fast, and privacy-friendly collection of online tools built for developers, designers, and content creators.',
};

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">About QuickTools</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-neutral max-w-none space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold mb-3">Who We Are</h2>
              <p>
                QuickTools is a free, open collection of online utility tools designed for developers,
                designers, content creators, students, and anyone who needs quick, reliable tools
                without the hassle of signing up or installing software.
              </p>
              <p>
                We believe that essential online tools should be free, fast, and accessible to everyone.
                No subscriptions, no paywalls, no unnecessary account creation — just tools that work
                when you need them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Our Mission</h2>
              <p>
                Our mission is simple: provide high-quality, privacy-respecting online tools that save
                you time. Every tool on QuickTools is designed to be fast, intuitive, and reliable.
                We continuously improve and expand our tool collection based on user needs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">What We Offer</h2>
              <p>QuickTools currently includes the following free online tools:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Word Counter</strong> — Count words, characters, sentences, paragraphs, and
                  estimated reading time instantly.
                </li>
                <li>
                  <strong>Lorem Ipsum Generator</strong> — Generate placeholder text for your designs
                  and layouts in one click.
                </li>
                <li>
                  <strong>JSON Formatter</strong> — Beautify, validate, and format JSON data with
                  error highlighting.
                </li>
                <li>
                  <strong>Case Converter</strong> — Convert text between uppercase, lowercase, title
                  case, sentence case, and more.
                </li>
                <li>
                  <strong>Password Generator</strong> — Create secure, random passwords with
                  customizable length and character options.
                </li>
                <li>
                  <strong>Base64 Encoder/Decoder</strong> — Encode and decode Base64 strings quickly
                  and easily.
                </li>
                <li>
                  <strong>URL Encoder/Decoder</strong> — Encode and decode URLs for safe web usage.
                </li>
                <li>
                  <strong>Color Picker & Converter</strong> — Pick colors and convert between HEX,
                  RGB, and HSL formats.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Our Principles</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Free Forever:</strong> All tools are completely free to use with no hidden
                  charges or premium tiers.
                </li>
                <li>
                  <strong>Privacy First:</strong> All processing happens in your browser. We do not
                  store, collect, or transmit your data to any server.
                </li>
                <li>
                  <strong>No Sign-Up Required:</strong> Use any tool instantly without creating an
                  account or providing personal information.
                </li>
                <li>
                  <strong>Fast & Reliable:</strong> Our tools are optimized for speed and work on any
                  device — desktop, tablet, or mobile.
                </li>
                <li>
                  <strong>Open to Feedback:</strong> We value user feedback and continuously improve
                  our tools based on your suggestions.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Technology</h2>
              <p>
                QuickTools is built with modern web technologies including Next.js, TypeScript,
                and Tailwind CSS. We leverage the latest web standards to ensure fast performance,
                accessibility, and a smooth user experience across all browsers and devices.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
              <p>
                Have questions, feedback, or suggestions? We would love to hear from you. Please
                visit our{' '}
                <a href="/contact" className="text-emerald-600 hover:underline">
                  Contact page
                </a>{' '}
                to get in touch with us.
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
              <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}