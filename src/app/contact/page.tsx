import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — QuickTools',
  description: 'Get in touch with the QuickTools team. Report issues, suggest features, or ask questions about our free online tools.',
};

export default function ContactPage() {
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-8">
            We would love to hear from you. Whether you have a question, feedback, or a feature suggestion,
            feel free to reach out.
          </p>

          <div className="space-y-8">
            <section className="bg-muted/30 rounded-lg p-6 border">
              <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    For general inquiries, support, or feedback:
                  </p>
                  <a
                    href="mailto:technosupportnow@gmail.com"
                    className="text-emerald-600 hover:underline font-medium text-sm"
                  >
                    technosupportnow@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">What Can We Help With?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted/30 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm mb-1">Bug Reports</h3>
                  <p className="text-xs text-muted-foreground">
                    Found something not working correctly? Let us know and we will fix it as soon as possible.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm mb-1">Feature Suggestions</h3>
                  <p className="text-xs text-muted-foreground">
                    Have an idea for a new tool or an improvement? We would love to hear your suggestions.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm mb-1">General Questions</h3>
                  <p className="text-xs text-muted-foreground">
                    Any questions about how our tools work or how to use them? We are happy to help.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 border">
                  <h3 className="font-medium text-sm mb-1">Partnerships</h3>
                  <p className="text-xs text-muted-foreground">
                    Interested in partnering with us or integrating our tools? Reach out to discuss.
                  </p>
                </div>
              </div>
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
              <a href="/about" className="hover:text-foreground transition-colors">About Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}