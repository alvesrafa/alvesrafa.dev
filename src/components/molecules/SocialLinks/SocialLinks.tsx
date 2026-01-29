'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '@/data/navigation';
import { cn } from '@/lib/utils/cn';

interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const buttonSizeStyles = {
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
};

export function SocialLinks({
  className,
  size = 'md',
  variant = 'default',
}: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon];

        return (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel={link.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className={cn(
              'rounded-lg transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              buttonSizeStyles[size],
              variant === 'default'
                ? 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400'
                : 'border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:border-primary-500 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400'
            )}
            aria-label={link.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={sizeStyles[size]} />
          </motion.a>
        );
      })}
    </div>
  );
}
