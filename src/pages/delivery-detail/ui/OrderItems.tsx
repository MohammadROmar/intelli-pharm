import { useTranslation } from 'react-i18next';
import { Gift, ShoppingCart, Tag } from 'lucide-react';

import type { DeliveryDetail, DeliveryOrderItem } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  BadgeLink,
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

type Props = {
  delivery: DeliveryDetail;
  canViewMedicine: boolean;
  canViewGift: boolean;
  canViewOffer: boolean;
};

export function OrderItems({
  delivery,
  canViewMedicine,
  canViewGift,
  canViewOffer,
}: Props) {
  const { t, i18n } = useTranslation('deliveries', {
    keyPrefix: 'detail',
  });

  const { order } = delivery;

  return (
    <DetailCard
      title={t('sections.items')}
      subtitle={t('sections.itemsSubtitle')}
      icon={ShoppingCart}
      itemsCount={order.items.length}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('table.medicineId')}</TableHead>
            <TableHead>{t('table.medicine')}</TableHead>
            <TableHead>{t('table.type')}</TableHead>
            <TableHead>{t('table.quantity')}</TableHead>
            <TableHead>{t('table.unitPrice')}</TableHead>
            <TableHead>{t('table.total')}</TableHead>
            {canViewMedicine ? (
              <TableHead>{t('table.actions')}</TableHead>
            ) : null}
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.items.map((item) => (
            <OrderItemRow
              key={item.id}
              item={item}
              lang={i18n.language}
              t={t}
              canViewMedicine={canViewMedicine}
              canViewGift={canViewGift}
              canViewOffer={canViewOffer}
            />
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-muted-foreground text-sm">
              {t('table.totalItems')}
            </TableCell>
            <TableCell className="font-semibold tabular-nums">
              {delivery.number_of_items}
            </TableCell>
            {canViewMedicine ? <TableCell /> : null}
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

function OrderItemRow({
  item,
  lang,
  t,
  canViewMedicine,
  canViewGift,
  canViewOffer,
}: {
  item: DeliveryOrderItem;
  lang: string;
  t: ReturnType<typeof useTranslation>['t'];
  canViewMedicine: boolean;
  canViewGift: boolean;
  canViewOffer: boolean;
}) {
  const isGift = item.is_gift === 1;

  return (
    <TableRow className={isGift ? 'bg-muted/30' : undefined}>
      <TableCell className="text-muted-foreground text-xs">
        {item.medicine.id}
      </TableCell>

      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {item.medicine.commercial_name}
        </p>
      </TableCell>

      <TableCell>
        {isGift ? (
          <div className="flex flex-col gap-0.5">
            <Badge
              variant="secondary"
              className="w-fit gap-1 border-emerald-200 bg-emerald-50 px-1.5 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
            >
              <Gift className="size-3" />
              {t('table.gift')}
            </Badge>
            {item.gift_id !== null && (
              <BadgeLink
                label={`${t('table.gift')} #${item.gift_id}`}
                to={
                  canViewGift
                    ? `/dashboard/promotions/gifts/${item.gift_id}`
                    : undefined
                }
                icon={Tag}
              />
            )}

            {item.offer_id !== null && (
              <BadgeLink
                label={`${t('table.offer')} #${item.offer_id}`}
                to={
                  canViewOffer
                    ? `/dashboard/promotions/offers/${item.offer_id}`
                    : undefined
                }
                icon={Tag}
              />
            )}
          </div>
        ) : (
          <span className="text-muted-foreground text-xs">
            {t('table.regular')}
          </span>
        )}
      </TableCell>

      <TableCell className="text-muted-foreground tabular-nums">
        ×{item.quantity}
      </TableCell>

      <TableCell className="text-muted-foreground tabular-nums">
        {isGift ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t('table.free')}
          </span>
        ) : (
          formatPrice(item.unit_price, lang)
        )}
      </TableCell>

      <TableCell className="font-semibold tabular-nums">
        {isGift ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t('table.free')}
          </span>
        ) : (
          formatPrice(item.total_price, lang)
        )}
      </TableCell>

      {canViewMedicine ? (
        <TableActions
          item={item.medicine}
          itemId={item.medicine.id}
          path="/dashboard/medicines"
        >
          <TableActions.Detail />
        </TableActions>
      ) : null}
    </TableRow>
  );
}
