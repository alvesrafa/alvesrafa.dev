import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  primary:
    'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
  secondary:
    'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
  accent:
    'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  outline:
    'bg-transparent border border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  variant = 'default',
  size = 'sm',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
