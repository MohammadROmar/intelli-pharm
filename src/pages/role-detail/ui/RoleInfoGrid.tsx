import { useTranslation } from 'react-i18next';
import { CalendarDays, RefreshCw, Shield } from 'lucide-react';

import type { RoleItem } from '@/entities/role';
import { DetailCard, DetailCell, Separator, SplitDateTime } from '@/shared/ui';

type Props = { role: RoleItem };

export function RoleInfoGrid({ role }: Props) {
  const { t } = useTranslation('roles');

  return (
    <DetailCard
      title={t('detail.infoTitle')}
      subtitle={t('detail.infoSubtitle')}
      icon={Shield}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('shared.name')}>
          {t(`roleLabels.${role.name}`)}
        </DetailCell>

        <DetailCell label={t('shared.permissions')}>
          {t('shared.permissionsCount', { count: role.permissions.length })}
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('shared.createdAt')}>
          <SplitDateTime date={role.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('shared.updatedAt')}>
          <SplitDateTime date={role.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
