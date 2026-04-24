import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, LayoutDashboard } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from './Breadcrumb';

export function BreadCrumbs({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar.labels' });

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 1) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {segments.map((segment, i) => {
          const href = `/${segments.slice(0, i + 1).join('/')}`;
          const isId = /^\d+$/.test(segment);
          const label = isId
            ? `#${segment}`
            : t(segment, { defaultValue: segment });

          const isRoot = i === 0;

          const Content = isRoot ? (
            <div className="flex items-center gap-1.5">
              <LayoutDashboard className="size-3.5" />
              <span className="sr-only">{label}</span>
            </div>
          ) : (
            label
          );

          return (
            <BreadcrumbItem key={href} className="flex-wrap text-xs md:text-sm">
              {i === segments.length - 1 ? (
                <BreadcrumbPage>{Content}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink
                    asChild
                    href={href}
                    className="focus-visible:text-primary focus-visible:underline!"
                  >
                    <Link to={href}>{Content}</Link>
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
