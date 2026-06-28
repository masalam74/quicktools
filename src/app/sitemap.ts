import { MetadataRoute } from 'next';
import { toolsData } from '@/lib/tools-data';

const BASE_URL = 'https://quicktools-tau.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const toolUrls = toolsData.map((tool) => ({
    url: `${BASE_URL}/?tool=${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...toolUrls,
  ];
}