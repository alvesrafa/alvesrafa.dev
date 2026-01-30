import { DM_Sans, Space_Grotesk, Fira_Code } from 'next/font/google';
import { notFound } from 'next/navigation';
import { i18nConfig, isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Providers } from '@/app/providers';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/seo/schema';
import type { Locale } from '@/types';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  // Generate JSON-LD schemas
  const personSchema = generatePersonSchema(locale as Locale);
  const websiteSchema = generateWebSiteSchema();

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${bodyFont.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={[personSchema, websiteSchema]} />
      </head>
      <body className="font-sans antialiased">
        <Providers locale={locale as Locale} dictionary={dictionary}>
          <div className="flex min-h-screen flex-col">
            <Header
              locale={locale as Locale}
              dictionary={{
                skipToMain: dictionary.accessibility.skipToMain,
                openMenu: dictionary.accessibility.openMenu,
                closeMenu: dictionary.accessibility.closeMenu,
                toggleTheme: dictionary.accessibility.toggleTheme,
                switchLanguage: dictionary.accessibility.switchLanguage,
              }}
            />
            <main id="main-content" className="flex-grow pt-16 md:pt-20">
              {children}
            </main>
            <Footer
              locale={locale as Locale}
              dictionary={{
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
