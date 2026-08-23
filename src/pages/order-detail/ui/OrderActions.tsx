import { Suspense } from 'react';
import type { TFunction } from 'i18next';

import { CancelOrder } from '@/features/order-cancel';
import { ChangeOrderStatus } from '@/features/order-change-status';
import {
  DownloadOrderInvoice,
  PrintOrderInvoice,
} from '@/features/order-invoice';
import type { OrderDetail } from '@/entities/order';
import { ErrorBoundary } from '@/shared/lib';
import {
  ActionsDropdown,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  Skeleton,
} from '@/shared/ui';

type Props = {
  order: OrderDetail;
  orderCode: string;
  t: TFunction<'order-detail', 'detail.header'>;
};

type OrderActionsProps = Props & {
  canCancel: boolean;
  canChangeStatus: boolean;
};

const ACTION_FALLBACK = <Skeleton className="h-8 w-full" />;

export function OrderActions(props: OrderActionsProps) {
  const { order, orderCode, t } = props;

  return (
    <ActionsDropdown label={t('actions')}>
      <ErrorBoundary fallback={null} resetKeys={[order.id, order.status]}>
        <Suspense fallback={ACTION_FALLBACK}>
          <OrderMutationActions {...props} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={null} resetKeys={[order.id, orderCode]}>
        <Suspense fallback={ACTION_FALLBACK}>
          <OrderInvoicesActions order={order} orderCode={orderCode} t={t} />
        </Suspense>
      </ErrorBoundary>
    </ActionsDropdown>
  );
}

function OrderMutationActions({
  order,
  canCancel,
  canChangeStatus,
  t,
}: OrderActionsProps) {
  const isTerminalStatus =
    order.status === 'completed' || order.status === 'cancelled';

  const canChangeOrderStatus = canChangeStatus && !isTerminalStatus;
  const canCancelOrder = canCancel && !isTerminalStatus;

  const hasAvailableMutation = canChangeOrderStatus || canCancelOrder;

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-muted-foreground text-xs! uppercase">
        {t('order')}
      </DropdownMenuLabel>

      {hasAvailableMutation ? (
        <>
          {canChangeOrderStatus ? (
            <DropdownMenuItem
              onSelect={(event) => event.preventDefault()}
              className="[&_button]:contents [&_button]:font-normal"
            >
              <ChangeOrderStatus order={order} />
            </DropdownMenuItem>
          ) : null}

          {canCancelOrder ? (
            <DropdownMenuItem
              variant="destructive"
              onSelect={(event) => event.preventDefault()}
              className="text-destructive hover:text-destructive hover:bg-destructive/20! [&_button]:contents [&_button]:font-normal"
            >
              <CancelOrder orderId={order.id} currentStatus={order.status} />
            </DropdownMenuItem>
          ) : null}
        </>
      ) : (
        <DropdownMenuItem disabled>{t('noOrderActions')}</DropdownMenuItem>
      )}
    </DropdownMenuGroup>
  );
}

function OrderInvoicesActions({ t, order, orderCode }: Props) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-muted-foreground text-xs! uppercase">
        {t('invoice')}
      </DropdownMenuLabel>

      <DownloadOrderInvoice orderId={order.id} orderCode={orderCode} />

      <PrintOrderInvoice orderId={order.id} />
    </DropdownMenuGroup>
  );
}
