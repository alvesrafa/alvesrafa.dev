import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig, isValidLocale } from '@/lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a valid locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from various sources
  let locale = i18nConfig.defaultLocale;

  // 1. Check cookie preference
  const cookieLocale = request.cookies.get(i18nConfig.localeCookie)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  }
  // 2. Check Vercel's geo header (country-based)
  else {
    const country = request.geo?.country;
    if (country === 'BR') {
      locale = 'pt-BR';
    }
    // 3. Fallback to Accept-Language header
    else {
      const acceptLanguage = request.headers.get('Accept-Language');
      if (acceptLanguage) {
        const languages = acceptLanguage
          .split(',')
          .map((lang) => lang.split(';')[0].trim().toLowerCase());

        for (const lang of languages) {
          if (lang.startsWith('pt')) {
            locale = 'pt-BR';
            break;
          }
          if (lang.startsWith('en')) {
            locale = 'en';
            break;
          }
        }
      }
    }
  }

  // Redirect to localized path
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Match all paths except:
    // - api routes
    // - static files (with extensions)
    // - _next internal paths
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)',
  ],
};
