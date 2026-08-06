import { useTranslation } from 'react-i18next';
import { Cross, Network, User } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { BadgeLink, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = {
  delivery: DeliveryDetail;
  canViewEmployee: boolean;
  canViewPharmacy: boolean;
};

export function RelatedRecords({
  delivery,
  canViewEmployee,
  canViewPharmacy,
}: Props) {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.related')}
      subtitle={t('sections.relatedSubtitle')}
      icon={Network}
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        <DetailCell label={t('fields.assignedTo')}>
          <BadgeLink
            label={delivery.distributor_name}
            to={
              canViewEmployee
                ? `/dashboard/employees/${delivery.user_id}`
                : undefined
            }
            icon={User}
          />
        </DetailCell>

        <Separator className="hidden lg:block" />

        <DetailCell label={t('fields.pharmacy')}>
          <BadgeLink
            label={delivery.pharmacy_name}
            to={
              canViewPharmacy
                ? `/dashboard/pharmacies/${delivery.pharmacy_id}`
                : undefined
            }
            icon={Cross}
          />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
