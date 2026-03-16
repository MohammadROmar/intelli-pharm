import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn, buttonVariants } from '../lib';
import { Spinner } from './spinner';

type ButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
  isLoading?: boolean;
} & VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading && <Spinner className="flex items-center justify-center" />}
      {children}
    </Comp>
  );
}
