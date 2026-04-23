import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import {
  DetailCard,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function OrderItems({ delivery }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  return (
    <DetailCard
      title={t('sections.items')}
      subtitle={t('sections.itemsSubtitle')}
      icon={ShoppingCart}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.medicineId')}</TableHead>
            <TableHead>{t('table.medicine')}</TableHead>
            <TableHead>{t('table.quantity')}</TableHead>
            <TableHead>{t('table.unitPrice')}</TableHead>
            <TableHead>{t('table.total')}</TableHead>
            <TableHead>{t('table.actions')}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {delivery.order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-muted-foreground text-xs">
                {item.medicine.id}
              </TableCell>
              <TableCell className="font-medium">
                {item.medicine.commercial_name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                ×{item.quantity}
              </TableCell>
              <TableCell className="text-muted-foreground tabular-nums">
                {formatPrice(item.total_price / item.quantity, i18n.language)}
              </TableCell>
              <TableCell className="font-semibold tabular-nums">
                {formatPrice(item.total_price, i18n.language)}
              </TableCell>
              <TableActions
                item={item.medicine}
                itemId={item.medicine.id}
                path="/dashboard/medicines"
              >
                <TableActions.Detail />
              </TableActions>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-muted-foreground text-sm">
              {t('table.totalItems')}
            </TableCell>
            <TableCell className="font-semibold tabular-nums">
              {delivery.number_of_items}
            </TableCell>
            <TableCell />
            <TableCell className="font-bold tabular-nums">
              {formatPrice(delivery.required_payment_amount, i18n.language)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </DetailCard>
  );
}
