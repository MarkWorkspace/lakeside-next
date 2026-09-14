import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production' ? 'https://xn--80aaenjeva2aw3a.xn--p1ai' : 'http://localhost:3000');
  
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date('2025-02-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}