import { ChevronDown, KeyRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PermissionsContent } from '@/entities/permission';
import type { Permission } from '@/shared/api';
import { Badge } from '@/shared/ui';

type ProfilePermissionsSectionProps = { permissions: Permission[] };

export function ProfilePermissionsSection({
  permissions,
}: ProfilePermissionsSectionProps) {
  const { t, i18n } = useTranslation('profile', { keyPrefix: 'permissions' });

  const formattedCount = new Intl.NumberFormat(i18n.language).format(
    permissions.length,
  );

  return (
    <section aria-labelledby="profile-permissions-title">
      <details className="group bg-card border-border/70 overflow-hidden rounded-xl border shadow-sm">
        <summary className="hover:bg-muted/30 focus-visible:ring-ring flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-inset sm:px-5 [&::-webkit-details-marker]:hidden">
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
            <KeyRound className="size-4" aria-hidden />
          </div>

          <div className="min-w-0">
            <h2
              id="profile-permissions-title"
              className="text-sm leading-none font-semibold"
            >
              {t('title')}
            </h2>

            <p className="text-muted-foreground mt-1 text-xs leading-4">
              {t('description')}
            </p>
          </div>

          <Badge
            variant="secondary"
            className="ms-auto h-5 min-w-5 shrink-0 justify-center px-1.5 text-[11px] tabular-nums"
            aria-label={t('countLabel', {
              count: permissions.length,
            })}
          >
            {formattedCount}
          </Badge>

          <ChevronDown
            className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden
          />
        </summary>

        <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 border-t px-4 py-4 motion-safe:duration-200 sm:px-5 sm:py-5">
          <PermissionsContent permissions={permissions} />
        </div>
      </details>
    </section>
  );
}
