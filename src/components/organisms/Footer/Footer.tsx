'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { navigationItems, personalInfo, socialLinks } from '@/data/navigation';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
  dictionary: {
    copyright: string;
    builtWith: string;
    and: string;
    deployedOn: string;
  };
}

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-20 items-start">

          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-mono text-sm font-medium tracking-[0.12em] text-neutral-900 dark:text-neutral-50 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              RA
            </Link>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
              {personalInfo.role[locale]}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="label-mono mb-5">
              {locale === 'pt-BR' ? 'Navegação' : 'Navigation'}
            </p>
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200"
                >
                  {item.label[locale]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label-mono mb-5">
              {locale === 'pt-BR' ? 'Contato' : 'Contact'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200"
              >
                {personalInfo.email}
              </a>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tracking-wide">
            &copy; {currentYear} {personalInfo.shortName}
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  aria-label={social.name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
