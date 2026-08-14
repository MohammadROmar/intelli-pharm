import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  PackageSearch,
  Pill,
  Tag,
} from 'lucide-react';

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
  finalTotal: string;
  totalQuantity: string;
  canViewMedicine: boolean;
  canViewGift: boolean;
  canViewOffer: boolean;
};

export function OrderItemsTable({
  items,
  finalTotal,
  totalQuantity,
  canViewMedicine,
  canViewGift,
  canViewOffer,
}: Props) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.items')}
      subtitle={t('sections.itemsSubtitle')}
      icon={Pill}
      itemsCount={items.length}
    >
      {items.length === 0 ? (
        <DetailEmptyState label={t('table.noItems')} icon={PackageSearch} />
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <OrderItemMobileCard
                key={item.id}
                item={item}
                language={i18n.language}
                canViewMedicine={canViewMedicine}
                canViewGift={canViewGift}
                canViewOffer={canViewOffer}
              />
            ))}

            <div className="bg-muted/30 grid grid-cols-2 gap-3 rounded-xl border p-4">
              <MobileTotal
                label={t('table.totalUnits')}
                value={Number(totalQuantity || 0).toLocaleString(i18n.language)}
              />
              <MobileTotal
                label={t('table.orderTotal')}
                value={formatPrice(finalTotal, i18n.language)}
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
                  {canViewMedicine ? (
                    <TableHead className="w-16">{t('table.actions')}</TableHead>
                  ) : null}
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((item) => (
                  <OrderItemRow
                    key={item.id}
                    item={item}
                    language={i18n.language}
                    canViewMedicine={canViewMedicine}
                    canViewGift={canViewGift}
                    canViewOffer={canViewOffer}
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
                    {Number(totalQuantity || 0).toLocaleString(i18n.language)}
                  </TableCell>
                  <TableCell />
                  <TableCell className="font-bold tabular-nums">
                    {formatPrice(finalTotal, i18n.language)}
                  </TableCell>
                  {canViewMedicine ? <TableCell /> : null}
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
  item: OrderItem;
  language: string;
  canViewMedicine: boolean;
  canViewGift: boolean;
  canViewOffer: boolean;
};

function OrderItemRow({
  item,
  language,
  canViewMedicine,
  canViewGift,
  canViewOffer,
}: ItemProps) {
  const { t } = useTranslation('order-detail', {
    keyPrefix: 'detail.table',
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
        <ItemType
          item={item}
          canViewGift={canViewGift}
          canViewOffer={canViewOffer}
        />
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {item.quantity.toLocaleString(language)}
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {isGift ? t('free') : formatPrice(item.unit_price, language)}
      </TableCell>
      <TableCell className="font-semibold tabular-nums">
        {isGift ? t('free') : formatPrice(item.total_price, language)}
      </TableCell>
      {canViewMedicine ? (
        <TableActions
          item={item.medicine}
          itemId={item.medicine_id}
          path="/dashboard/medicines"
        >
          <TableActions.Detail />
        </TableActions>
      ) : null}
    </TableRow>
  );
}

function OrderItemMobileCard({
  item,
  language,
  canViewMedicine,
  canViewGift,
  canViewOffer,
}: ItemProps) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail.table',
  });
  const isGift = item.is_gift === 1;
  const DirectionIcon = i18n.dir() === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <article className="bg-card rounded-xl border p-4 [contain-intrinsic-size:148px] [content-visibility:auto]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="leading-snug font-semibold">
            {item.medicine.commercial_name}
          </p>
        </div>
        <ItemType
          item={item}
          canViewGift={canViewGift}
          canViewOffer={canViewOffer}
        />
      </div>

      <div className="my-4 grid grid-cols-3 gap-3 border-y py-3">
        <ItemMetric
          label={t('quantity')}
          value={item.quantity.toLocaleString(language)}
        />
        <ItemMetric
          label={t('unitPrice')}
          value={isGift ? t('free') : formatPrice(item.unit_price, language)}
        />
        <ItemMetric
          label={t('total')}
          value={isGift ? t('free') : formatPrice(item.total_price, language)}
          alignEnd
        />
      </div>

      {canViewMedicine ? (
        <Link
          to={`/dashboard/medicines/${item.medicine_id}`}
          className="text-primary focus-visible:ring-ring flex items-center justify-between rounded-lg px-1 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
        >
          {t('viewMedicine')}
          <DirectionIcon className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </article>
  );
}

type ItemTypeProps = {
  item: OrderItem;
  canViewGift: boolean;
  canViewOffer: boolean;
};

function ItemType({ item, canViewGift, canViewOffer }: ItemTypeProps) {
  const { t } = useTranslation('order-detail', {
    keyPrefix: 'detail.table',
  });

  if (item.is_gift !== 1) {
    return (
      <span className="text-muted-foreground text-xs">{t('regular')}</span>
    );
  }

  return (
    <div className="flex flex-wrap justify-end gap-1.5 md:justify-start">
      <Badge variant="success" className="gap-1!">
        <Gift className="size-3" aria-hidden="true" />
        {t('gift')}
      </Badge>

      {item.gift_id !== null ? (
        <BadgeLink
          label={`${t('giftRule')} #${item.gift_id}`}
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
