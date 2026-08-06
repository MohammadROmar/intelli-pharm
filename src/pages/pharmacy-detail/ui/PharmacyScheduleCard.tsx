import { useTranslation } from 'react-i18next';
import { Activity, Briefcase, Clock, MapPin } from 'lucide-react';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { formatTime } from '@/shared/lib';
import {
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
  Badge,
} from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail; canViewRegion: boolean };

export function PharmacyScheduleCard({ pharmacy, canViewRegion }: Props) {
  const { t, i18n } = useTranslation('pharmacies');
  return (
    <DetailCard
      title={t('detail.pharmacyScheduleCardTitle')}
      subtitle={t('detail.pharmacyScheduleCardSubtitle')}
      icon={Briefcase}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelStatus')}>
          <Badge
            variant={pharmacy.is_active ? 'success' : 'muted'}
            className="font-normal"
          >
            <Activity />
            {pharmacy.is_active ? t('detail.active') : t('detail.inactive')}
          </Badge>
        </DetailCell>
        <DetailCell label={t('detail.labelRegion')}>
          <BadgeLink
            label={pharmacy.region}
            to={
              canViewRegion
                ? `/dashboard/regions/${pharmacy.region_id}`
                : undefined
            }
            icon={MapPin}
          />
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('detail.labelOpeningTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-3.5 shrink-0" />
            {formatTime(pharmacy.opening_time, i18n.language)}
          </span>
        </DetailCell>
        <DetailCell label={t('detail.labelClosingTime')}>
          <span className="flex items-center gap-1.5">
            <Clock className="text-muted-foreground size-3.5 shrink-0" />
            {formatTime(pharmacy.closing_time, i18n.language)}
          </span>
        </DetailCell>
      </div>

      {pharmacy.holidays && pharmacy.holidays.length > 0 && (
        <>
          <Separator />
          <DetailCell label={t('detail.labelHolidays')}>
            <div className="mt-1 flex flex-wrap gap-2">
              {pharmacy.holidays.map((day) => (
                <Badge
                  key={day}
                  variant="secondary"
                  className="text-sm font-normal"
                >
                  {t(`days.${day}`)}
                </Badge>
              ))}
            </div>
          </DetailCell>
        </>
      )}
    </DetailCard>
  );
}
