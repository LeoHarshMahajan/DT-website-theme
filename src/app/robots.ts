import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

/**
 * robots.txt generation
 * Accessible at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, '');
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Disallow everything in non-production environments
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/auth/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
