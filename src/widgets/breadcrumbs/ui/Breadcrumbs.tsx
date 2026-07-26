import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, LayoutDashboard } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/ui';

const NUMERIC_SEGMENT_REGEX = /^\d+$/;

const KEBAB_CASE_REGEX = /-([a-z])/g;

type Crumb = { href: string; label: string; isRoot: boolean };

type BreadCrumbsProps = { className?: string };

function isNumericSegment(segment: string): boolean {
  return NUMERIC_SEGMENT_REGEX.test(segment);
}

function toI18nKey(segment: string): string {
  return segment.replace(KEBAB_CASE_REGEX, (_, char: string) =>
    char.toUpperCase(),
  );
}

function RootCrumbIcon({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <LayoutDashboard className="size-3.5" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function BreadCrumbs({ className }: BreadCrumbsProps) {
  const { pathname } = useLocation();
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar.labels' });

  const crumbs = useMemo<Crumb[]>(() => {
    const segments = pathname.split('/').filter(Boolean);

    return segments.reduce<Crumb[]>((crumbs, segment, i) => {
      const parentHref = crumbs[i - 1]?.href ?? '';
      const href = `${parentHref}/${segment}`;

      const label = isNumericSegment(segment)
        ? `#${segment}`
        : t(toI18nKey(segment), { defaultValue: segment });

      crumbs.push({ href, label, isRoot: i === 0 });
      return crumbs;
    }, []);
  }, [pathname, t]);

  if (crumbs.length <= 1) return null;

  const lastIndex = crumbs.length - 1;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {crumbs.map(({ href, label, isRoot }, i) => {
          const isCurrent = i === lastIndex;
          const content = isRoot ? <RootCrumbIcon label={label} /> : label;

          return (
            <BreadcrumbItem key={href} className="flex-wrap text-xs md:text-sm">
              {isCurrent ? (
                <BreadcrumbPage>{content}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    asChild
                    href={href}
                    className="focus-visible:text-primary focus-visible:underline!"
                  >
                    <Link to={href}>{content}</Link>
                  </BreadcrumbLink>
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
