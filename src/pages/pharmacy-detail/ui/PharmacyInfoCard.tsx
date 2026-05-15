import { useTranslation } from 'react-i18next';
import { Activity, Briefcase, Clock, MapPin } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { formatTime } from '@/shared/lib';
import {
  Badge,
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
} from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyInfoCard({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('pharmacies', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('pharmacyStateCardTitle')}
      subtitle={t('pharmacyStateCardSubtitle')}
      icon={Briefcase}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelStatus')}>
          <Badge
            variant={pharmacy.is_active ? 'success' : 'muted'}
            className="font-normal"
          >
            <Activity />
            {pharmacy.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
        <DetailCell label={t('labelRegion')}>
          <BadgeLink
            label={pharmacy.region}
            to={`/dashboard/regions/${pharmacy.region_id}`}
            icon={MapPin}
          />
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelOpeningTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-3.5 shrink-0" />
            {formatTime(pharmacy.opening_time, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('labelClosingTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-3.5 shrink-0" />
            {formatTime(pharmacy.closing_time, i18n.language)}
          </span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
