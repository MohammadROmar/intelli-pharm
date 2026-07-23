import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

import { cn } from '../lib';

type LabeledLinkProps = {
  to: string;
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
    <Link
      to={to}
      className={cn(
        'hover:text-primary group flex w-fit min-w-0 items-center gap-1 text-sm font-medium transition-colors hover:underline',
        className,
      )}
    >
      <span className="max-w-[20ch] min-w-0 truncate">{label}</span>
      {withIcon && (
        <ExternalLink className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </Link>
  );
}
