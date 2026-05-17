import { cn } from '../../lib';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('shimmer animate-skeleton rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
