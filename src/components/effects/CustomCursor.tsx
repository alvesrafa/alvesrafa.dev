'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on devices with pointer
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest('a, button, [data-cursor-hover], input, textarea, select');

      if (interactiveElement) {
        setIsHovering(true);
        const customText = interactiveElement.getAttribute('data-cursor-text');
        if (customText) {
          setHoverText(customText);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest('a, button, [data-cursor-hover], input, textarea, select');

      if (interactiveElement) {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference',
          'rounded-full bg-white',
          'transition-transform duration-150'
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 60 : 12,
          height: isHovering ? 60 : 12,
          translateX: isHovering ? -30 : -6,
          translateY: isHovering ? -30 : -6,
          scale: isClicking ? 0.8 : 1,
        }}
      >
        {hoverText && (
          <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-medium">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary-500/50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          translateX: isHovering ? -40 : -20,
          translateY: isHovering ? -40 : -20,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
