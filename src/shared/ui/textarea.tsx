import type { ComponentProps, ElementType } from 'react';

import { cn } from '../lib';

type TextareaProps = { icon?: ElementType } & ComponentProps<'textarea'>;

function Textarea({ className, icon: Icon, ...props }: TextareaProps) {
  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          Icon && 'ltr:pl-9 rtl:pr-9',
          className,
        )}
        {...props}
      />

      {Icon && <Icon className="input-icon top-3 translate-y-0" />}
    </div>
  );
}

export { Textarea };
