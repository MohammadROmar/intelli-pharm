import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ChangeOrderStatus } from '@/features/order-change-status';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { OrderInfoCard } from './OrderInfoCard';
import { OrderItemsTable } from './OrderItemsTable';
import { useGetOrderSuspense } from '../model/useGetOrderSuspense';

export default function OrderDetailPage() {
  const { t } = useTranslation('orders', { keyPrefix: 'detail' });

  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {
    return <QueryDisabled path="/dashboard/orders" />;
  }

  return (
    <QueryErrorBoundary>
      <OrderDetailContent orderId={orderId} t={t} />
    </QueryErrorBoundary>
  );
}

type OrderDetailContentProps = { orderId: number; t: (s: string) => string };

function OrderDetailContent({ orderId, t }: OrderDetailContentProps) {
  const { data } = useGetOrderSuspense(orderId);
  const grantedPermissions = useGrantedPermissions();

  const canChangeStatus = hasPermission(
    grantedPermissions,
    'erp.orders.update',
  );
  const canViewPharmacy = hasPermission(
    grantedPermissions,
    'erp.pharmacies.view',
  );
  const canViewEmployee = hasPermission(
    grantedPermissions,
    'erp.employees.view',
  );
  const canViewOffer = hasPermission(grantedPermissions, 'erp.offers.view');
  const canViewGift = hasPermission(grantedPermissions, 'erp.gifts.view');
  const canViewMedicine = hasPermission(
    grantedPermissions,
    'erp.medicines.view',
  );

  const order = data.data;

  if (!order) {
    throw new Error('Order response did not include order data.');
  }

  const pageTitle = `#${order.id} · ${t('pageTitle')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            ORD-{String(order.id).padStart(6, '0')}
          </h1>
          {canChangeStatus ? <ChangeOrderStatus order={order} /> : null}
        </div>
        <OrderInfoCard
          order={order}
          canViewPharmacy={canViewPharmacy}
          canViewEmployee={canViewEmployee}
          canViewOffer={canViewOffer}
        />
        <OrderItemsTable
          items={order.items}
          totalAmount={order.total_amount}
          totalQuantity={order.total_quantity}
          canViewMedicine={canViewMedicine}
          canViewGift={canViewGift}
          canViewOffer={canViewOffer}
        />
      </div>
    </>
  );
}
