import type { ComponentProps, ElementType } from 'react';

import { cn } from '../lib';

type InputProps = {
  icon?: ElementType;
} & ComponentProps<'input'>;

function Input({ className, icon: Icon, type, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/50 border-input bg-input/20 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          Icon && 'ltr:pl-9 rtl:pr-9',
          className,
        )}
        {...props}
      />

      {Icon && <Icon className="input-icon" />}
    </div>
  );
}

export { Input };
