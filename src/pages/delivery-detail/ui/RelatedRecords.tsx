import { useTranslation } from 'react-i18next';
import { Building2, Network, User } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function RelatedRecords({ delivery }: Props) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.related')}
      subtitle={t('sections.relatedSubtitle')}
      icon={Network}
    >
      <DetailCell label={t('fields.assignedTo')}>
        <BadgeLink
          label={delivery.distributor_name}
          to={`/dashboard/employees/${delivery.user_id}`}
          icon={User}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.pharmacy')}>
        <BadgeLink
          label={delivery.pharmacy_name}
          to={`/dashboard/pharmacies/${delivery.pharmacy_id}`}
          icon={Building2}
        />
      </DetailCell>
    </DetailCard>
  );
}
