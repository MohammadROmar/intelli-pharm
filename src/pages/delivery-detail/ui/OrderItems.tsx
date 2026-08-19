import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  PackageOpen,
  ShoppingCart,
  Tag,
} from 'lucide-react';

import type { DeliveryDetail, DeliveryOrderItem } from '@/entities/delivery';
import { cn, formatPrice } from '@/shared/lib';
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

import type { DeliveryDetailAccess } from '../model/useDeliveryDetailAccess';

type Props = { delivery: DeliveryDetail; actionAccess: DeliveryDetailAccess };

export function OrderItems({ delivery, actionAccess }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
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
      {order.items.length === 0 ? (
        <div className="bg-muted/30 flex flex-col items-center rounded-xl border border-dashed px-5 py-10 text-center">
          <PackageOpen className="text-muted-foreground mb-3 size-7" />
          <p className="font-semibold">{t('table.empty')}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {t('table.emptyDescription')}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {order.items.map((item) => (
              <OrderItemMobileCard
                key={item.id}
                actionAccess={actionAccess}
                item={item}
                language={i18n.language}
              />
            ))}

            <div className="bg-muted/30 grid grid-cols-2 gap-3 rounded-xl border p-4">
              <MobileTotal
                label={t('table.totalUnits')}
                value={delivery.number_of_items.toLocaleString(i18n.language)}
              />
              <MobileTotal
                label={t('table.orderValue')}
                value={formatPrice(Number(order.total_amount), i18n.language)}
                alignEnd
              />
            </div>
          </div>

          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.medicine')}</TableHead>
                  <TableHead>{t('table.type')}</TableHead>
                  <TableHead>{t('table.quantity')}</TableHead>
                  <TableHead>{t('table.unitPrice')}</TableHead>
                  <TableHead>{t('table.total')}</TableHead>
                  {actionAccess.canViewMedicine && (
                    <TableHead className="w-16">{t('table.actions')}</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {order.items.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    item={item}
                    actionAccess={actionAccess}
                    language={i18n.language}
                  />
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-muted-foreground text-sm"
                  >
                    {t('table.totalUnits')}
                  </TableCell>

                  <TableCell className="font-semibold tabular-nums">
                    {delivery.number_of_items.toLocaleString(i18n.language)}
                  </TableCell>

                  <TableCell />

                  <TableCell className="font-bold tabular-nums">
                    {formatPrice(Number(order.total_amount), i18n.language)}
                  </TableCell>

                  {actionAccess.canViewMedicine && <TableCell />}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </>
      )}
    </DetailCard>
  );
}

type ItemProps = {
  item: DeliveryOrderItem;
  language: string;
  actionAccess: DeliveryDetailAccess;
};

function OrderItemRow({ item, language, actionAccess }: ItemProps) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });
  const isGift = item.is_gift === 1;

  return (
    <TableRow className={isGift ? 'bg-muted/30' : undefined}>
      <TableCell>
        <div className="min-w-40">
          <p className="font-medium">{item.medicine.commercial_name}</p>
        </div>
      </TableCell>
      <TableCell>
        <ItemType item={item} actionAccess={actionAccess} />
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {item.quantity.toLocaleString(language)}
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {isGift ? t('table.free') : formatPrice(item.unit_price, language)}
      </TableCell>
      <TableCell className="font-semibold tabular-nums">
        {isGift ? t('table.free') : formatPrice(item.total_price, language)}
      </TableCell>
      {actionAccess.canViewMedicine && (
        <TableActions
          item={item.medicine}
          itemId={item.medicine.id}
          path="/dashboard/medicines"
        >
          <TableActions.Detail />
        </TableActions>
      )}
    </TableRow>
  );
}

function OrderItemMobileCard({ item, language, actionAccess }: ItemProps) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });
  const isGift = item.is_gift === 1;
  const DirectionIcon = i18n.dir() === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <article className="bg-card rounded-xl border p-4 [contain-intrinsic-size:140px] [content-visibility:auto]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="leading-snug font-semibold">
            {item.medicine.commercial_name}
          </p>
        </div>
        <ItemType item={item} actionAccess={actionAccess} />
      </div>

      <div
        className={cn(
          'my-4 grid grid-cols-3 gap-3 border-y py-3',
          !actionAccess.canViewMedicine && 'mb-0 border-b-0 pb-0',
        )}
      >
        <ItemMetric
          label={t('table.quantity')}
          value={item.quantity.toLocaleString(language)}
        />
        <ItemMetric
          label={t('table.unitPrice')}
          value={
            isGift ? t('table.free') : formatPrice(item.unit_price, language)
          }
        />
        <ItemMetric
          label={t('table.total')}
          value={
            isGift ? t('table.free') : formatPrice(item.total_price, language)
          }
          alignEnd
        />
      </div>

      {actionAccess.canViewMedicine && (
        <Link
          to={`/dashboard/medicines/${item.medicine.id}`}
          className="text-primary focus-visible:ring-ring flex items-center justify-between rounded-lg px-1 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {t('table.viewMedicine')}
          <DirectionIcon className="size-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

type ItemTypeProps = {
  item: DeliveryOrderItem;
  actionAccess: DeliveryDetailAccess;
};

function ItemType({ item, actionAccess }: ItemTypeProps) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail.table',
  });
  const isGift = item.is_gift === 1;
  const { canViewOffer, canViewGift } = actionAccess;

  if (!isGift) {
    return (
      <span className="text-muted-foreground text-xs">{t('regular')}</span>
    );
  }

  return (
    <div className="flex flex-wrap justify-end gap-1.5 md:justify-start">
      <Badge variant="success" className="gap-1!">
        <Gift className="size-3" />
        {t('gift')}
      </Badge>
      {item.gift_id !== null ? (
        <BadgeLink
          label={`${t('gift')} #${item.gift_id}`}
          to={
            canViewGift
              ? `/dashboard/promotions/gifts/${item.gift_id}`
              : undefined
          }
          icon={Tag}
        />
      ) : null}
      {item.offer_id !== null ? (
        <BadgeLink
          label={`${t('offer')} #${item.offer_id}`}
          to={
            canViewOffer
              ? `/dashboard/promotions/offers/${item.offer_id}`
              : undefined
          }
          icon={Tag}
        />
      ) : null}
    </div>
  );
}

type MetricProps = {
  label: string;
  value: string;
  alignEnd?: boolean;
};

function ItemMetric({ label, value, alignEnd = false }: MetricProps) {
  return (
    <div className={alignEnd ? 'min-w-0 text-end' : 'min-w-0'}>
      <p className="text-muted-foreground text-[11px]">{label}</p>
      <p className="mt-1 text-xs font-semibold wrap-break-word tabular-nums">
        {value}
      </p>
    </div>
  );
}

function MobileTotal({ label, value, alignEnd = false }: MetricProps) {
  return (
    <div className={alignEnd ? 'text-end' : undefined}>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 text-sm font-bold tabular-nums">{value}</p>
    </div>
  );
}
