'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
}: MarqueeProps) {
  const duration = 100 / speed;

  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap',
        pauseOnHover && 'group',
        className
      )}
    >
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: pauseOnHover ? undefined : 'running',
        }}
      >
        <div className={cn('inline-flex', pauseOnHover && 'group-hover:[animation-play-state:paused]')}>
          {children}
          {children}
        </div>
      </motion.div>
    </div>
  );
}

interface InfiniteTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  speed?: number;
}

export function InfiniteText({
  text,
  className,
  textClassName,
  speed = 30,
}: InfiniteTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div className="flex whitespace-nowrap" style={{ x: springX }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={cn(
              'text-7xl md:text-9xl font-bold mx-8 text-stroke',
              textClassName
            )}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface TechStackMarqueeProps {
  technologies: string[];
  className?: string;
  speed?: number;
}

export function TechStackMarquee({
  technologies,
  className,
  speed = 40,
}: TechStackMarqueeProps) {
  return (
    <Marquee className={cn('py-8', className)} speed={speed}>
      <div className="flex items-center gap-12 mx-6">
        {technologies.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-lg font-medium text-neutral-300">{tech}</span>
          </div>
        ))}
      </div>
    </Marquee>
  );
}
