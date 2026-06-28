import type { Metadata } from 'next';
import QuickToolsApp from '@/components/quicktools-app';
import { getToolData, generateJsonLd, generateHomepageJsonLd, toolsData } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://quicktools.vercel.app';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const toolSlug = params.tool;
  const tool = toolSlug ? getToolData(toolSlug) : undefined;

  if (tool) {
    return {
      title: tool.metaTitle,
      description: tool.metaDescription,
      keywords: tool.keywords,
      openGraph: {
        title: tool.name + ' — QuickTools',
        description: tool.metaDescription,
        url: `${BASE_URL}/?tool=${tool.slug}`,
        type: 'website',
        siteName: 'QuickTools',
      },
      twitter: {
        card: 'summary_large_image',
        title: tool.name + ' — QuickTools',
        description: tool.metaDescription,
      },
      alternates: {
        canonical: `${BASE_URL}/?tool=${tool.slug}`,
      },
    };
  }

  return {
    title: 'QuickTools — 8 Free Online Tools for Developers, Designers & Creators',
    description:
      'Free online tools: Word Counter, Lorem Ipsum Generator, JSON Formatter, Case Converter, Password Generator, Base64 Encoder, URL Encoder, and Color Picker. No signup required. 100% browser-based, zero data sent to servers.',
    keywords: [
      'free online tools',
      'word counter',
      'lorem ipsum generator',
      'json formatter',
      'case converter',
      'password generator',
      'base64 encoder',
      'url encoder',
      'color picker',
      'developer tools',
      'web tools',
      'text tools',
      'free tools no signup',
      'browser-based tools',
    ],
    openGraph: {
      title: 'QuickTools — 8 Free Online Tools',
      description: 'Free online tools for developers, designers, and content creators. No signup, no tracking, no data sent to servers.',
      url: BASE_URL,
      type: 'website',
      siteName: 'QuickTools',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'QuickTools — 8 Free Online Tools',
      description: 'Free online tools for developers, designers, and content creators.',
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string }>;
}) {
  const params = await searchParams;
  const toolSlug = params.tool || null;
  const tool = toolSlug ? getToolData(toolSlug) : undefined;

  const jsonLd = tool
    ? generateJsonLd(tool, BASE_URL)
    : generateHomepageJsonLd(BASE_URL);

  // Generate sitemap hints for all tools
  const allToolLinks = toolsData
    .map(
      (t) =>
        `${BASE_URL}/?tool=${t.slug}`
    )
    .join('\n');

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sitemap hints for search engines */}
      <link
        rel="sitemap"
        type="application/xml"
        href={`${BASE_URL}/sitemap.xml`}
      />
      <QuickToolsApp initialTool={toolSlug} />
    </>
  );
}
