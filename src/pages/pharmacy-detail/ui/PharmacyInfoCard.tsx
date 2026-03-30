import { useTranslation } from 'react-i18next';
import { Activity, Clock, MapPin } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { formatTime } from '@/shared/lib';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyInfoCard({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  return (
    <DetailCard
      title={t('locationCardTitle')}
      subtitle={t('locationCardSubtitle')}
      icon={MapPin}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelStatus')}>
          <Badge
            variant={pharmacy.is_active ? 'default' : 'secondary'}
            className="font-normal"
          >
            <Activity className="mr-1 size-3" />
            {pharmacy.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
        <DetailCell label={t('labelRegion')}>
          <span className="flex items-center gap-1.5">
            <MapPin className="text-muted-foreground size-4 shrink-0" />
            {pharmacy.region}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelOpeningTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-4 shrink-0" />
            {formatTime(pharmacy.opening_time, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('labelClosingTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-4 shrink-0" />
            {formatTime(pharmacy.closing_time, i18n.language)}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelLatitude')}>
          <span className="flex items-center gap-1.5 font-mono text-sm">
            {pharmacy.latitude}
          </span>
        </DetailCell>
        <DetailCell label={t('labelLongitude')}>
          <span className="font-mono text-sm">{pharmacy.longitude}</span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
