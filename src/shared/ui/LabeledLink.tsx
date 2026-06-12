import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

import { cn } from '../lib';

type LabeledLinkProps = { to: string; label: string; className?: string };

export function LabeledLink({ to, label, className }: LabeledLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        'hover:text-primary group flex items-center gap-1 text-sm font-medium transition-colors hover:underline',
        className,
      )}
    >
      <span className="max-w-[20ch] truncate">{label}</span>
      <ExternalLink className="text-muted-foreground size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
