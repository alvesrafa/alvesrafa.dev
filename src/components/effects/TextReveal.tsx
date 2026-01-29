'use client';

import { cn } from '@/lib/utils/cn';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: 'words' | 'chars' | 'lines';
}

export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
  type = 'words',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getElements = () => {
    switch (type) {
      case 'chars':
        return children.split('');
      case 'lines':
        return children.split('\n');
      case 'words':
      default:
        return children.split(' ');
    }
  };

  const elements = getElements();

  const separator = type === 'chars' ? '' : type === 'lines' ? <br /> : ' ';

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {elements.map((element, i) => (
        <span
          key={i}
          className={cn(
            'inline-block overflow-hidden',
            type === 'words' && i < elements.length - 1 && 'mr-[0.25em]'
          )}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.33, 1, 0.68, 1],
                  delay: delay + i * staggerDelay,
                },
              },
            }}
          >
            {element}
          </motion.span>
          {i < elements.length - 1 && separator}
        </span>
      ))}
    </motion.div>
  );
}

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -z-10 text-accent-500 opacity-70"
        style={{
          animation: 'glitch1 2.5s infinite',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
        }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 -z-10 text-primary-500 opacity-70"
        style={{
          animation: 'glitch2 2.5s infinite',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
        }}
      >
        {children}
      </span>
    </span>
  );
}

interface TypewriterTextProps {
  children: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({
  children,
  className,
  delay = 0,
  speed = 0.05,
}: TypewriterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const chars = children.split('');

  return (
    <motion.div ref={ref} className={cn('font-mono', className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + i * speed, duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      />
    </motion.div>
  );
}
