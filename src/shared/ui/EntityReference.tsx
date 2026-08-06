import type { ReactNode } from 'react';
import { Link, type To } from 'react-router';

type Props = {
  to?: To;
  className?: string;
  children: ReactNode;
};

export function EntityReference({ to, className, children }: Props) {
  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}
