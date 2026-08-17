import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';

type ConditionalLinkProps = Omit<LinkProps, 'children'> & {
  enabled: boolean;
  children: ReactNode;
};

export function ConditionalLink({
  enabled,
  children,
  ...linkProps
}: ConditionalLinkProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return <Link {...linkProps}>{children}</Link>;
}
