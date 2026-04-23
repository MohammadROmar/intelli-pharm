import { useTranslation } from 'react-i18next';
import { Cross, Building2, Map } from 'lucide-react';

import type { RegionDetail } from '@/entities/region';
import { DetailCard, DetailCell } from '@/shared/ui';

type Props = { region: RegionDetail };

export function RegionInfoCard({ region }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.detail',
  });

  return (
    <DetailCard title={t('cardTitle')} subtitle={t('cardSubtitle')} icon={Map}>
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCity')}>
          <span className="flex items-center gap-1.5">
            <Building2 className="text-muted-foreground size-3.5 shrink-0" />
            {region.city.name}
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
