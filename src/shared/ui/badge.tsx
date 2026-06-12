import type { ElementType } from 'react';
import { Link } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { ExternalLink } from 'lucide-react';

import { cn } from '../lib';

const badgeVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex w-fit max-w-full min-w-0 shrink-0 items-center justify-start gap-1 truncate overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 [a&]:hover:underline',

        success:
          'border-badge-success-border bg-badge-success-bg text-badge-success-text [a&]:hover:opacity-80',
        warning:
          'border-badge-warning-border bg-badge-warning-bg text-badge-warning-text [a&]:hover:opacity-80',
        info: 'border-badge-info-border bg-badge-info-bg text-badge-info-text [a&]:hover:opacity-80',
        destructive:
          'border-badge-destructive-border bg-badge-destructive-bg text-badge-destructive-text [a&]:hover:opacity-80',
        muted:
          'border-badge-muted-border bg-badge-muted-bg text-badge-muted-text [a&]:hover:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

type Props = { icon?: ElementType; label: string | number; to: string };

function BadgeLink({ icon: Icon, label, to }: Props) {
  return (
    <Badge asChild variant="secondary">
      <Link to={to}>
        {Icon && <Icon className="text-muted-foreground shrink-0" />}
        <span className="max-w-[20ch] truncate">{label}</span>
        <ExternalLink className="text-muted-foreground size-3 shrink-0" />
      </Link>
    </Badge>
  );
}

export { Badge, BadgeLink };
