import { ExternalLink } from 'lucide-react';

import { cn } from '../lib';
import { EntityReference } from './EntityReference';

type LabeledLinkProps = {
  to?: string;
  label: string;
  withIcon?: boolean;
  className?: string;
};

export function LabeledLink({
  to,
  label,
  withIcon = true,
  className,
}: LabeledLinkProps) {
  return (
    <EntityReference
      to={to}
      className={cn(
        'group flex w-fit min-w-0 items-center gap-1 text-sm font-medium transition-colors',
        to ? 'hover:text-primary hover:underline' : 'cursor-default',
        className,
      )}
    >
      <span className="max-w-[20ch] min-w-0 truncate">{label}</span>
      {to && withIcon ? (
        <ExternalLink
          aria-hidden
          className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      ) : null}
    </EntityReference>
  );
}
