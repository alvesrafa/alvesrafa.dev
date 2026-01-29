import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rafael Alves - Portfolio',
    short_name: 'Rafael Alves',
    description: 'Tech Lead & Full Stack Developer Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9fa',
    theme_color: '#4e8098',
    icons: [
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
