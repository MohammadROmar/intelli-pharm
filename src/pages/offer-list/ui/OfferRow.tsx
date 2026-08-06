import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PencilIcon } from 'lucide-react';

import { OfferTypeBadge, type Offer } from '@/entities/offer';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

type Props = {
  offer: Offer;
  actionAccess: OfferRowActionAccess;
  onEdit: (offer: Offer) => void;
  onDelete: (offer: Offer) => void;
};

export type OfferRowActionAccess = Readonly<{
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
}>;

export const OfferRow = memo(function OfferRow({
  offer,
  actionAccess,
  onEdit,
  onDelete,
}: Props) {
  const { t, i18n } = useTranslation('offers');

  return (
    <TableRow>
      <TableCell>
        <OfferTypeBadge type={offer.type} />
      </TableCell>
      <TableCell>{formatPrice(offer.required_amount, i18n.language)}</TableCell>
      <TableCell>
        <OfferBenefitCell offer={offer} />
      </TableCell>
      <TableCell>
        <Badge variant={offer.is_active ? 'success' : 'muted'}>
          {t(offer.is_active ? 'status.active' : 'status.inactive')}
        </Badge>
      </TableCell>
      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={offer}
          itemId={offer.id}
          onDelete={onDelete}
          path="/dashboard/promotions/offers"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
          {actionAccess.canUpdate ? (
            <EditOfferButton offer={offer} onEdit={onEdit} />
          ) : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});

function OfferBenefitCell({ offer }: { offer: Offer }) {
  if (offer.type === 'percentage') {
    return (
      <p>
        {offer.percentage}
        <span className="text-muted-foreground ml-0.5">%</span>
      </p>
    );
  }

  return (
    <p className="max-w-[20ch] truncate font-medium">
      <span className="text-muted-foreground text-xs ltr:mr-1.5 rtl:ml-1.5">
        {offer.quantity}×
      </span>
      {offer.medicine.commercial_name}
    </p>
  );
}

type EditOfferButtonProps = Pick<Props, 'offer' | 'onEdit'>;

function EditOfferButton({ offer, onEdit }: EditOfferButtonProps) {
  const { t } = useTranslation('common', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onSelect={() => onEdit(offer)}
      className="w-full cursor-pointer"
    >
      <PencilIcon className="size-4" />
      <span>{t('edit')}</span>
    </DropdownMenuItem>
  );
}
