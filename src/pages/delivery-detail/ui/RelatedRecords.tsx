import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cross, Network, Package, User } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function RelatedRecords({ delivery }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  return (
    <DetailCard
      title={t('sections.related')}
      subtitle={t('sections.relatedSubtitle')}
      icon={Network}
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
        <DetailCell label={t('fields.assignedTo')}>
          <Badge asChild variant="secondary">
            <Link to={`/dashboard/employees/${delivery.user_id}`}>
              <User className="text-muted-foreground size-3.5 shrink-0" />
              {delivery.user_id}
            </Link>
          </Badge>
        </DetailCell>

        <Separator className="hidden lg:block" />

        <DetailCell label={t('fields.pharmacy')}>
          <Badge asChild variant="secondary">
            <Link to={`/dashboard/pharmacies`}>
              <Cross className="text-muted-foreground size-3.5 shrink-0" />
              {delivery.pharmacy_name}
            </Link>
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <DetailCell label={t('fields.order')}>
        <Badge asChild variant="secondary">
          <Link to={`/dashboard/orders/${delivery.order_id}`}>
            <Package className="text-muted-foreground size-3.5 shrink-0" />
            {delivery.order_id}
          </Link>
        </Badge>
      </DetailCell>
    </DetailCard>
  );
}
