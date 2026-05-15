import { useTranslation } from 'react-i18next';
import { Cross, Building2, Map } from 'lucide-react';

import type { RegionDetail } from '@/entities/region';
import { DetailCard, DetailCell } from '@/shared/ui';
import { getLocalized } from '@/shared/lib';

type Props = { region: RegionDetail };

export function RegionInfoCard({ region }: Props) {
  const { t, i18n } = useTranslation('regions', {
    keyPrefix: 'detail',
  });

  const cityName = getLocalized(region.city.name, i18n.language);

  return (
    <DetailCard title={t('cardTitle')} subtitle={t('cardSubtitle')} icon={Map}>
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCity')}>
          <span className="flex items-center gap-1.5">
            <Building2 className="text-muted-foreground size-3.5 shrink-0" />
            {cityName}
          </span>
        </DetailCell>
        <DetailCell label={t('labelPharmaciesCount')}>
          <span className="flex items-center gap-1.5">
            <Cross className="text-muted-foreground size-3.5 shrink-0" />
            <span className="tabular-nums">{region.pharmacies.length}</span>
          </span>
        </DetailCell>
      </div>
    </DetailCard>
  );
}
