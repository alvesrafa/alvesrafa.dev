import { cn } from '@/lib/utils/cn';

interface SkipLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipLink({
  href = '#main-content',
  children,
  className,
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:absolute focus:top-4 focus:left-4 focus:z-50',
        'focus:px-4 focus:py-2 focus:rounded-md',
        'focus:bg-primary-500 focus:text-white',
        'focus:outline-none focus:ring-2 focus:ring-primary-300',
        'transition-all',
        className
      )}
    >
      {children}
    </a>
  );
}
