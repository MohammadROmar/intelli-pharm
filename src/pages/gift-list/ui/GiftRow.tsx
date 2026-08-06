import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { Gift } from '@/entities/gift';
import { getLocalized } from '@/shared/lib';
import {
  Badge,
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

export type GiftRowActionAccess = Readonly<{
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
}>;

type GiftRowProps = {
  gift: Gift;
  actionAccess: GiftRowActionAccess;
  onDelete: (gift: Gift) => void;
  onEdit: (gift: Gift) => void;
};

export const GiftRow = memo(function GiftRow({
  gift,
  actionAccess,
  onEdit,
  onDelete,
}: GiftRowProps) {
  const { t, i18n } = useTranslation('gifts', { keyPrefix: 'list' });

  const isActive = gift.active === 1;

  const name = getLocalized(gift.medicine.commercial_name, i18n.language);

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{name}</p>
      </TableCell>
      <TableCell>
        <Badge variant={isActive ? 'success' : 'muted'}>
          {isActive ? t('active') : t('inactive')}
        </Badge>
      </TableCell>
      <TableCell>{gift.required_quantity}</TableCell>
      <TableCell>{gift.gift_quantity}</TableCell>

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={gift}
          itemId={gift.id}
          onDelete={onDelete}
          path="/dashboard/promotions/gifts"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
          {actionAccess.canUpdate ? (
            <EditGiftButton gift={gift} onEdit={onEdit} />
          ) : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});

function EditGiftButton({
  gift,
  onEdit,
}: {
  gift: Gift;
  onEdit: (gift: Gift) => void;
}) {
  const { t } = useTranslation('common', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onSelect={() => onEdit(gift)}
      className="w-full cursor-pointer"
    >
      <Pencil className="size-4" />
      <span>{t('edit')}</span>
    </DropdownMenuItem>
  );
}
