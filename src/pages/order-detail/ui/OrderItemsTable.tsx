import { PackageSearch, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { OrderItem } from '@/entities/order';
import { formatPrice } from '@/shared/lib';
import {
  DetailCard,
  DetailEmptyState,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = {
  items: OrderItem[];
  totalAmount: string;
  totalQuantity: string;
};

export function OrderItemsTable({ items, totalAmount, totalQuantity }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'ordersPage.detail',
  });

  return (
    <DetailCard
      title={t('itemsTitle')}
      subtitle={t('itemsSubtitle')}
      icon={Pill}
      itemsCount={items.length}
    >
      {items.length === 0 ? (
        <DetailEmptyState label={t('noItems')} icon={PackageSearch} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-36">{t('colMedicineId')}</TableHead>
              <TableHead>{t('colMedicine')}</TableHead>
              <TableHead>{t('colQty')}</TableHead>
              <TableHead>{t('colUnitPrice')}</TableHead>
              <TableHead>{t('colTotalPrice')}</TableHead>
              <TableHead>{t('colActions')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, i) => (
              <TableRow key={`item-${item.medicine_id}-${i}`}>
                <TableCell className="text-muted-foreground text-xs">
                  {item.medicine_id}
                </TableCell>

                <TableCell className="font-medium">
                  {item.medicine.commercial_name}
                </TableCell>

                <TableCell className="text-muted-foreground tabular-nums">
                  {item.quantity}
                </TableCell>

                <TableCell className="text-muted-foreground tabular-nums">
                  {formatPrice(item.unit_price, i18n.language)}
                </TableCell>

                <TableCell className="tabular-nums">
                  {formatPrice(
                    String(+item.unit_price * item.quantity),
                    i18n.language,
                  )}
                </TableCell>
                <TableActions
                  item={item}
                  itemId={item.medicine_id}
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
                {t('footerTotal')}
              </TableCell>
              <TableCell className="font-semibold tabular-nums">
                {totalQuantity}
              </TableCell>
              <TableCell />
              <TableCell className="font-bold tabular-nums">
                {formatPrice(totalAmount, i18n.language)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </DetailCard>
  );
}
