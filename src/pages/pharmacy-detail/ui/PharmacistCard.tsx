import { Phone, Cross, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { PharmacyDetail } from '@/entities/pharmacy';
import { DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacistCard({ pharmacy }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  return (
    <DetailCard
      title={t('pharmacistCardTitle')}
      subtitle={t('pharmacistCardSubtitle')}
      icon={Cross}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span>{pharmacy.id}</span>
        </DetailCell>
        <DetailCell label={t('labelPharmacistName')}>
          <span className="flex items-center gap-1.5">
            <User className="text-muted-foreground size-3.5 shrink-0" />
            {pharmacy.pharmacist_name}
          </span>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelPhone')}>
          <span className="flex items-center gap-1.5">
            <Phone className="text-muted-foreground size-3.5 shrink-0 tabular-nums" />
            {pharmacy.pharmacist_phone}
          </span>
        </DetailCell>
        <DetailCell label={t('labelAltPhone')}>
          {pharmacy.pharmacist_alt_phone ? (
            <span className="flex items-center gap-1.5">
              <Phone className="text-muted-foreground size-3.5 shrink-0 tabular-nums" />
              {pharmacy.pharmacist_alt_phone}
            </span>
          ) : (
            <span className="text-muted-foreground font-normal">—</span>
          )}
        </DetailCell>
      </div>
    </DetailCard>
  );
}
