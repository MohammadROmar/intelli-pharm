import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import type { Gift } from '../model/giftTypes';
import {
  Badge,
  TableRow,
  TableCell,
  TableActions,
  DropdownMenuItem,
} from '@/shared/ui';

type GiftRowProps = {
  gift: Gift;
  onDelete: (gift: Gift) => void;
  onEdit: (gift: Gift) => void;
};

export function GiftRow({ gift, onEdit, onDelete }: GiftRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'giftsPage.list',
  });

  const isActive = gift.active === 1;

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">{gift.id}</TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {gift.medicine.commercial_name.en}
        </p>
      </TableCell>
      <TableCell>
        <Badge variant={isActive ? 'success' : 'muted'}>
          {isActive ? t('active') : t('inactive')}
        </Badge>
      </TableCell>
      <TableCell>{gift.required_quantity}</TableCell>
      <TableCell>{gift.gift_quantity}</TableCell>

      <TableActions
        item={gift}
        itemId={gift.id}
        onDelete={onDelete}
        path="/dashboard/promotions/gifts"
      >
        <TableActions.Detail />
        <EditCityButton gift={gift} onEdit={onEdit} />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}

function EditCityButton({ gift, onEdit }: Omit<GiftRowProps, 'onDelete'>) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'tableActions',
  });

  return (
    <DropdownMenuItem
      onClick={() => onEdit(gift)}
      className="w-full cursor-pointer"
    >
      <Pencil className="size-4" />
      <span>{t('update')}</span>
    </DropdownMenuItem>
  );
}
