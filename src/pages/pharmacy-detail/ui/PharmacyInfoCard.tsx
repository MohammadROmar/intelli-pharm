import { useTranslation } from 'react-i18next';
import { Activity, Briefcase, Clock, MapPin } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { formatTime } from '@/shared/lib';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';
import { Link } from 'react-router-dom';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyInfoCard({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
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
            variant={pharmacy.is_active ? 'default' : 'secondary'}
            className="font-normal"
          >
            <Activity className="size-3" />
            {pharmacy.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
        <DetailCell label={t('labelRegion')}>
          <Badge asChild variant="secondary">
            <Link to={`/dashboard/regions/${pharmacy.region_id}`}>
              <MapPin className="text-muted-foreground size-4 shrink-0" />
              {pharmacy.region}
            </Link>
          </Badge>
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
    </DetailCard>
  );
}
