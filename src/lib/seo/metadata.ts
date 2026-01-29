import { Metadata } from 'next';
import { siteConfig } from './constants';
import type { Locale } from '@/types';

interface GenerateMetadataParams {
  title?: string;
  description: string;
  path?: string;
  locale: Locale;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  locale,
  image,
  type = 'website',
  noIndex = false,
}: GenerateMetadataParams): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/en${path}`,
        'pt-BR': `${siteConfig.url}/pt-BR${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale === 'pt-BR' ? 'pt_BR' : 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@alvesrafa',
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#4e8098' },
      { media: '(prefers-color-scheme: dark)', color: '#90c2e7' },
    ],
  };
}
