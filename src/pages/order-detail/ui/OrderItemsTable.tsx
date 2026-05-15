import { PackageSearch, Pill, Gift, Tag } from 'lucide-react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { OrderItem } from '@/entities/order';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  BadgeLink,
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
  const { t, i18n } = useTranslation('orders', {
    keyPrefix: 'detail',
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
              <TableHead className="w-25">{t('colMedicineId')}</TableHead>
              <TableHead>{t('colMedicine')}</TableHead>
              <TableHead>{t('colType')}</TableHead>
              <TableHead>{t('colQty')}</TableHead>
              <TableHead>{t('colUnitPrice')}</TableHead>
              <TableHead>{t('colTotalPrice')}</TableHead>
              <TableHead>{t('colActions')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item, i) => (
              <OrderItemRow
                key={`item-${item.medicine_id}-${i}`}
                item={item}
                lang={i18n.language}
                t={t}
              />
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-muted-foreground text-sm">
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

function OrderItemRow({
  item,
  lang,
  t,
}: {
  item: OrderItem;
  lang: string;
  t: TFunction;
}) {
  const isGift = item.is_gift === 1;

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {item.medicine_id}
      </TableCell>

      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {item.medicine.commercial_name}
        </p>
      </TableCell>

      <TableCell>
        {isGift ? (
          <div className="flex flex-col gap-0.5">
            <Badge variant="success">
              <Gift />
              {t('tagGift')}
            </Badge>

            {item.gift_id !== null && (
              <BadgeLink
                label={`${t('giftSourceRule')} #${item.gift_id}`}
                to={`/dashboard/promotions/gifts/${item.gift_id}`}
                icon={Tag}
              />
            )}

            {item.offer_id !== null && (
              <BadgeLink
                label={`${t('giftSourceOffer')} #${item.offer_id}`}
                to={`/dashboard/promotions/offers/${item.offer_id}`}
                icon={Tag}
              />
            )}
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">
            {t('tagRegular')}
          </span>
        )}
      </TableCell>

      <TableCell className="text-muted-foreground tabular-nums">
        {item.quantity}
      </TableCell>

      <TableCell className="text-muted-foreground tabular-nums">
        {isGift ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t('free')}
          </span>
        ) : (
          formatPrice(item.unit_price, lang)
        )}
      </TableCell>

      <TableCell className="tabular-nums">
        {isGift ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t('free')}
          </span>
        ) : (
          formatPrice(item.total_price, lang)
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
  );
}
