'use client';

import { MagneticElement } from '@/components/effects/MagneticElement';
import { Marquee } from '@/components/effects/Marquee';
import { SocialLinks } from '@/components/molecules/SocialLinks';
import { navigationItems, personalInfo } from '@/data/navigation';
import type { Locale } from '@/types';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

interface FooterProps {
  locale: Locale;
  dictionary: {
    copyright: string;
    builtWith: string;
    and: string;
    deployedOn: string;
  };
}

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Three.js',
  'Vercel',
];

export function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-50 dark:bg-neutral-950"
    >
      {/* Tech Stack Marquee */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden opacity-5 dark:opacity-[0.03]">
        <Marquee speed={1} className="py-4">
          <div className="flex gap-8 mx-4">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="text-8xl font-bold text-neutral-900 dark:text-neutral-100 whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <motion.div style={{ opacity, y }} className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 space-y-6"
          >
            <MagneticElement strength={0.1}>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {personalInfo.shortName}
                </span>
              </Link>
            </MagneticElement>

            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              {personalInfo.role[locale]}
            </p>

            <SocialLinks size="md" className="gap-3" />
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-6 uppercase tracking-wider">
              {locale === 'pt-BR' ? 'Navegação' : 'Navigation'}
            </h3>
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item, index) => (
                <MagneticElement key={item.href} strength={0.1}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Link
                      href={`/${locale}${item.href === '/' ? '' : item.href}`}
                      className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="w-0 h-px bg-primary-500 group-hover:w-4 transition-all duration-300" />
                      <span>{item.label[locale]}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.div>
                </MagneticElement>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-6 uppercase tracking-wider">
              {locale === 'pt-BR' ? 'Contato' : 'Contact'}
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-neutral-200/50 dark:border-neutral-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              &copy; {currentYear} {personalInfo.shortName}. {dictionary.copyright}
            </p>

            {/* <motion.div
              className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400"
              whileHover={{ scale: 1.02 }}
            >
              <span>{dictionary.builtWith}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="h-4 w-4 text-accent-500 fill-accent-500" />
              </motion.div>
              <span>{dictionary.and}</span>
              <Code2 className="h-4 w-4 text-primary-500" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Next.js</span>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <span>{dictionary.deployedOn}</span>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Vercel
              </a>
            </motion.div> */}
          </div>
        </motion.div>
      </motion.div>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
    </footer>
  );
}
