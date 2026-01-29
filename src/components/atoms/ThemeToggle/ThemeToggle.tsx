'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
  className?: string;
  label?: string;
}

export function ThemeToggle({ className, label }: ThemeToggleProps) {
  const { toggleTheme, isDark, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={cn(
          'p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          className
        )}
        aria-label={label || 'Toggle theme'}
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg',
        'bg-neutral-100 dark:bg-neutral-800',
        'hover:bg-neutral-200 dark:hover:bg-neutral-700',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        className
      )}
      aria-label={
        label || (isDark ? 'Switch to light mode' : 'Switch to dark mode')
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-primary-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
