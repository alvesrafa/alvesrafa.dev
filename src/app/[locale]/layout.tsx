import { Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { i18nConfig, isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Providers } from '@/app/providers';
import { RailNav } from '@/components/organisms/RailNav';
import { MobileHeader } from '@/components/organisms/MobileHeader';
import { Footer } from '@/components/organisms/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { SkipLink } from '@/components/atoms/SkipLink';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/seo/schema';
import type { Locale } from '@/types';

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);
  const personSchema = generatePersonSchema(locale as Locale);
  const websiteSchema = generateWebSiteSchema();

  return (
    <html
      lang={locale}
      className={`${interFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={[personSchema, websiteSchema]} />
      </head>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-50">
        <Providers locale={locale as Locale} dictionary={dictionary}>
          <SkipLink>{dictionary.accessibility.skipToMain}</SkipLink>

          {/* Desktop: fixed left rail */}
          <RailNav locale={locale as Locale} />

          {/* Mobile: top pinned header */}
          <MobileHeader locale={locale as Locale} />

          {/* Content area: offset from rail on desktop, full width on mobile */}
          <div className="md:ml-[80px] min-h-screen flex flex-col">
            <main id="main-content" className="flex-grow mt-14 md:mt-0">
              {children}
            </main>
            <Footer
              dictionary={{
                build: dictionary.footer.build,
                tagline: dictionary.footer.tagline,
                scrollTop: dictionary.footer.scrollTop,
                copyright: dictionary.footer.copyright,
                builtWith: dictionary.footer.builtWith,
                and: dictionary.footer.and,
                deployedOn: dictionary.footer.deployedOn,
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
