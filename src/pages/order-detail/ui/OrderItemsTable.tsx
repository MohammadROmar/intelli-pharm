import { memo, useCallback, useMemo } from 'react';
import { PackageSearch, Pill, Gift, Tag } from 'lucide-react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { OrderItem } from '@/entities/order';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
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

type OrderItemRowActionAccess = Readonly<{
  canView: boolean;
  hasAnyRowAction: boolean;
}>;

export function OrderItemsTable({ items, totalAmount, totalQuantity }: Props) {
  const { t, i18n } = useTranslation('orders', {
    keyPrefix: 'detail',
  });
  const grantedPermissions = useGrantedPermissions();

  const canView = hasPermission(grantedPermissions, 'erp.medicines.view');

  const actionAccess = useMemo<OrderItemRowActionAccess>(
    () => ({
      canView,
      hasAnyRowAction: canView,
    }),
    [canView],
  );

  const renderRow = useCallback(
    (item: OrderItem, index: number) => (
      <OrderItemRow
        key={`item-${item.medicine_id}-${index}`}
        item={item}
        lang={i18n.language}
        t={t}
        actionAccess={actionAccess}
      />
    ),
    [actionAccess, i18n.language, t],
  );

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
              {actionAccess.hasAnyRowAction ? (
                <TableHead>{t('colActions')}</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>

          <TableBody>{items.map(renderRow)}</TableBody>

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
              {actionAccess.hasAnyRowAction ? <TableCell /> : null}
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </DetailCard>
  );
}

const OrderItemRow = memo(function OrderItemRow({
  item,
  lang,
  t,
  actionAccess,
}: {
  item: OrderItem;
  lang: string;
  t: TFunction;
  actionAccess: OrderItemRowActionAccess;
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

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={item}
          itemId={item.medicine_id}
          path="/dashboard/medicines"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});
