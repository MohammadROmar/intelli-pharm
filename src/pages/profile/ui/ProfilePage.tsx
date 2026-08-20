import { UserRoundX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/shared/config';
import { Card, CardContent } from '@/shared/ui';

import { ProfileHeader } from './ProfileHeader';
import { ProfileOverview } from './ProfileOverview';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';
import { ProfilePermissionsSection } from './ProfilePermissionsSection';

function ProfileUnavailable() {
  const { t } = useTranslation('profile', { keyPrefix: 'unavailable' });

  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        <div className="bg-muted text-muted-foreground mb-4 flex size-14 items-center justify-center rounded-2xl">
          <UserRoundX className="size-7" aria-hidden />
        </div>

        <h1 className="text-xl font-semibold">{t('title')}</h1>

        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6">
          {t('description')}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  const { user, roles, permissions, isLoading } = useAppSelector(
    (state) => state.session,
  );

  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  if (!user) {
    return <ProfileUnavailable />;
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <ProfileHeader user={user} />

      <ProfileOverview user={user} role={roles?.[0] ?? null} />

      <ProfilePermissionsSection permissions={permissions} />
    </main>
  );
}
