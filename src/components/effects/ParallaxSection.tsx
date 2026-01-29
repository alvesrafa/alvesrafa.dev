'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * factor, -100 * speed * factor]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

interface ParallaxTextProps {
  children: string;
  className?: string;
  baseVelocity?: number;
}

export function ParallaxText({
  children,
  className,
  baseVelocity = 100,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -baseVelocity]);

  return (
    <div ref={ref} className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex gap-8" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-6xl md:text-8xl font-bold opacity-10">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeInSection({
  children,
  className,
  delay = 0,
  direction = 'up',
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { y: 0, x: 50 };
      case 'right':
        return { y: 0, x: -50 };
      default:
        return { y: 50, x: 0 };
    }
  };

  const initial = getInitialPosition();
  const y = useTransform(scrollYProgress, [0, 1], [initial.y, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x }}
      className={cn(className)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScaleInSection({ children, className }: ScaleInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
