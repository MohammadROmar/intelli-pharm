import { useTranslation } from 'react-i18next';

import type { SessionUser } from '@/entities/session';

type ProfileHeaderProps = {
  user: SessionUser;
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => Array.from(part)[0] ?? '')
    .join('')
    .toLocaleUpperCase();
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { t } = useTranslation('profile', {
    keyPrefix: 'header',
  });

  return (
    <header className="bg-card relative overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6">
      <div
        className="bg-primary/5 pointer-events-none absolute -end-12 -top-16 size-40 rounded-full"
        aria-hidden="true"
      />

      <div className="flex min-w-0 items-start gap-4">
        <div className="bg-primary/10 text-primary hidden size-12 shrink-0 items-center justify-center rounded-xl border text-lg font-semibold sm:flex">
          <span aria-hidden>{getInitials(user.name) || 'U'}</span>
        </div>

        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
            {t('eyebrow')}
          </p>

          <h1 className="text-2xl font-bold tracking-tight wrap-break-word sm:text-3xl">
            {user.name}
          </h1>

          <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-6">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </header>
  );
}
