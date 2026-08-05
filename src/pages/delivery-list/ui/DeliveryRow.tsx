import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

import {
  DeliveryStatusBadge,
  DeliveryPaymentStatusBadge,
  type DeliveryListItem,
} from '@/entities/delivery';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  TableCell,
  TableActions,
  TableRow,
  DropdownMenuItem,
} from '@/shared/ui';

type DeliveryRowProps = { delivery: DeliveryListItem };

export function DeliveryRow({ delivery }: DeliveryRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {delivery.id}
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {delivery.pharmacy_name}
        </p>
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {delivery.distributor_name}
        </p>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(delivery.scheduled_at, i18n.language, false)}
      </TableCell>
      <TableCell>{<DeliveryStatusBadge status={delivery.status} />}</TableCell>
      <TableCell>
        {<DeliveryPaymentStatusBadge status={delivery.payment_status} />}
      </TableCell>
      <TableCell className="font-medium">
        {formatPrice(delivery.required_payment_amount, i18n.language)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {delivery.number_of_items}
      </TableCell>

      <TableActions
        item={delivery}
        itemId={delivery.id}
        path="/dashboard/deliveries"
      >
        <TableActions.Detail />
        <ChangeStatus id={delivery.id} />
      </TableActions>
    </TableRow>
  );
}

function ChangeStatus({ id }: { id: number }) {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'changeStatus',
  });

  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/deliveries/${id}?focus=change-status`}
        className="cursor-pointer"
      >
        <RefreshCw className="size-4" />
        <span>{t('trigger')}</span>
      </Link>
    </DropdownMenuItem>
  );
}
