import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuickToolsApp from '@/components/quicktools-app';
import { getToolData, generateJsonLd, toolsData } from '@/lib/tools-data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://quicktools-tau.vercel.app';

export function generateStaticParams() {
  return toolsData.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolsData.find((item) => item.slug === slug);
  if (!tool) return {};
  const url = `${BASE_URL}/${tool.slug}`;
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      type: 'website',
      siteName: 'QuickTools',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolsData.find((item) => item.slug === slug);
  if (!tool) notFound();

  const jsonLd = {
    ...generateJsonLd(tool, BASE_URL),
    url: `${BASE_URL}/${tool.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <QuickToolsApp initialTool={tool.slug} />
    </>
  );
}
