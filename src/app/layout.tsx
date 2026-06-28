import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickTools — 8 Free Online Tools for Developers, Designers & Creators",
  description:
    "Free online tools: Word Counter, Lorem Ipsum Generator, JSON Formatter, Case Converter, Password Generator, Base64 Encoder, URL Encoder, and Color Picker. No signup required. 100% browser-based.",
  keywords: [
    "word counter",
    "lorem ipsum generator",
    "JSON formatter",
    "JSON validator",
    "case converter",
    "password generator",
    "base64 encoder",
    "base64 decoder",
    "URL encoder",
    "URL decoder",
    "color picker",
    "HEX to RGB",
    "online tools",
    "free tools",
    "developer tools",
    "web tools",
    "text tools",
  ],
  authors: [{ name: "QuickTools" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "QuickTools — 8 Free Online Tools",
    description:
      "Free online tools for developers, designers, and content creators. Word Counter, JSON Formatter, Password Generator, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}