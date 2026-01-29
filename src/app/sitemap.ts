import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/constants';
import { i18nConfig } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = i18nConfig.locales;
  const lastModified = new Date();

  // Static pages
  const staticPages = ['', '/about', '/projects', '/contact'];

  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => {
      const changeFrequency: 'weekly' | 'monthly' = page === '' ? 'weekly' : 'monthly';
      return {
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency,
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      };
    })
  );

  return staticUrls;
}
