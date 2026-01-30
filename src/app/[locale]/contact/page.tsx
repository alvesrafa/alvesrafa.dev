import { SocialLinks } from '@/components/molecules/SocialLinks';
import { JsonLd } from '@/components/seo/JsonLd';
import { personalInfo } from '@/data/navigation';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { siteConfig } from '@/lib/seo/constants';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema, generateContactPageSchema } from '@/lib/seo/schema';
import type { Locale } from '@/types';
import { Clock, Mail, MapPin } from 'lucide-react';
import { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  return generatePageMetadata({
    title: dictionary.metadata.contact.title,
    description: dictionary.metadata.contact.description,
    path: '/contact',
    locale: locale as Locale,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dictionary.nav.home, url: `${siteConfig.url}/${locale}` },
    { name: dictionary.nav.contact, url: `${siteConfig.url}/${locale}/contact` },
  ]);

  const contactSchema = generateContactPageSchema(locale as Locale);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, contactSchema]} />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              {dictionary.contact.title}
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-2">
              {dictionary.contact.subtitle}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400">
              {dictionary.contact.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">

            {/* Primary CTA - Email */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
                {dictionary.contact.info.title}
              </h2>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                {dictionary.contact.send}
              </a>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Location Card */}
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-100 mb-1">
                      {dictionary.contact.info.location}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-100 mb-1">
                      {dictionary.contact.info.availability}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {dictionary.contact.info.availabilityText}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="text-center pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-100 mb-6">
                {dictionary.contact.social.title}
              </h3>
              <SocialLinks size="lg" className="justify-center" />
            </div>

            {/* Additional Info */}
            <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {locale === 'pt-BR'
                  ? 'Prefere uma conversa direta? Me envie um email ou conecte-se comigo no LinkedIn. Respondo geralmente em até 24 horas.'
                  : "Prefer a direct conversation? Send me an email or connect with me on LinkedIn. I usually respond within 24 hours."}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
