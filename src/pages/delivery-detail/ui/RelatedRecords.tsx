import { useTranslation } from 'react-i18next';
import { Cross, Network, User } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

import type { DeliveryDetailAccess } from '../model/useDeliveryDetailAccess';

type Props = { delivery: DeliveryDetail; actionAccess: DeliveryDetailAccess };

export function RelatedRecords({ delivery, actionAccess }: Props) {
  const { t } = useTranslation('delivery-detail', { keyPrefix: 'detail' });

  return (
    <DetailCard
      title={t('sections.related')}
      subtitle={t('sections.relatedSubtitle')}
      icon={Network}
    >
      <DetailCell label={t('fields.assignedTo')}>
        <BadgeLink
          label={delivery.distributor_name}
          to={
            actionAccess.canViewEmployee
              ? `/dashboard/employees/${delivery.user_id}`
              : undefined
          }
          icon={User}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.pharmacy')}>
        <BadgeLink
          label={delivery.pharmacy_name}
          to={
            actionAccess.canViewPharmacy
              ? `/dashboard/pharmacies/${delivery.pharmacy_id}`
              : undefined
          }
          icon={Cross}
        />
      </DetailCell>
    </DetailCard>
  );
}
