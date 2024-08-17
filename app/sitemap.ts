import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://happy.apiki.me',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://happy.apiki.me/docs',
      lastModified: new Date(),
      priority: 1,
    },
  ]
}
