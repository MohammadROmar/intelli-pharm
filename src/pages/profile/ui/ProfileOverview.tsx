import {
  ContactRound,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { SessionUser } from '@/entities/session';
import { DetailCard, Separator } from '@/shared/ui';

type ProfileOverviewProps = {
  user: SessionUser;
  role: string | null;
};

export function ProfileOverview({ user, role }: ProfileOverviewProps) {
  const { t: tDetails } = useTranslation('profile', { keyPrefix: 'details' });
  const { t: tAccess } = useTranslation('profile', { keyPrefix: 'access' });
  const { t: tRoles } = useTranslation('roles', { keyPrefix: 'roleLabels' });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <DetailCard
        title={tDetails('title')}
        subtitle={tDetails('subtitle')}
        icon={ContactRound}
      >
        <dl className="space-y-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
              <UserRound className="size-5" aria-hidden />
            </div>

            <div className="min-w-0">
              <dt className="text-muted-foreground text-sm">
                {tDetails('name')}
              </dt>

              <dd className="mt-1 font-medium wrap-break-word">{user.name}</dd>
            </div>
          </div>

          <Separator />

          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Mail className="size-5" aria-hidden />
            </div>

            <div className="min-w-0">
              <dt className="text-muted-foreground text-sm">
                {tDetails('email')}
              </dt>

              <dd className="mt-1">
                {user.email ? (
                  <span
                    dir="ltr"
                    className="block text-start font-medium break-all"
                  >
                    {user.email}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {tDetails('notProvided')}
                  </span>
                )}
              </dd>
            </div>
          </div>
        </dl>
      </DetailCard>

      <DetailCard
        title={tAccess('title')}
        subtitle={tAccess('subtitle')}
        icon={ShieldCheck}
      >
        <dl className="space-y-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
              <ShieldCheck className="size-5" aria-hidden />
            </div>

            <div className="min-w-0">
              <dt className="text-muted-foreground text-sm">
                {tAccess('role')}
              </dt>

              <dd className="mt-1 font-medium wrap-break-word">
                {role
                  ? tRoles(role, { defaultValue: role })
                  : tAccess('noRole')}
              </dd>
            </div>
          </div>

          <Separator />

          <div className="flex min-w-0 items-start gap-3">
            <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Phone className="size-5" aria-hidden />
            </div>

            <div className="min-w-0">
              <dt className="text-muted-foreground text-sm">
                {tDetails('phoneNumber')}
              </dt>

              <dd className="mt-1">
                {user.phone_number ? (
                  <span
                    dir="ltr"
                    className="block text-start font-medium break-all"
                  >
                    {user.phone_number}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {tDetails('notProvided')}
                  </span>
                )}
              </dd>
            </div>
          </div>
        </dl>
      </DetailCard>
    </div>
  );
}
