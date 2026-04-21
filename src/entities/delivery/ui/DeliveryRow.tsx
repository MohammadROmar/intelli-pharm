import { formatDate } from '@/shared/lib';
import type { DeliveryListItem } from '../model/deliveryTypes';
import {
  TableCell,
  TableActions,
  TableRow,
  DropdownMenuItem,
} from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';
import { DeliveryPaymentStatusBadge } from './DeliveryPaymentStatusBadge';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

type DeliveryRowProps = { delivery: DeliveryListItem };

export function DeliveryRow({ delivery }: DeliveryRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{delivery.id}</TableCell>
      <TableCell>{delivery.pharmacy_name}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(delivery.scheduled_at, i18n.language, false)}
      </TableCell>
      <TableCell>{<DeliveryStatusBadge status={delivery.status} />}</TableCell>
      <TableCell>
        {<DeliveryPaymentStatusBadge status={delivery.payment_status} />}
      </TableCell>
      <TableCell className="font-medium">
        {delivery.required_payment_amount}
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
  const { t } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.changeStatus',
  });

  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/deliveries/${id}/change-status`}
        className="cursor-pointer"
      >
        <RefreshCw className="size-4" />
        <span>{t('tooltipLabel')}</span>
      </Link>
    </DropdownMenuItem>
  );
}
