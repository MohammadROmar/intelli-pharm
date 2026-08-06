import { memo } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PackagePlus } from 'lucide-react';

import type { Medicine } from '@/entities/medicine';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  Badge,
  DropdownMenuItem,
  TableActions,
  TableCell,
  TableRow,
} from '@/shared/ui';

export type MedicineRowActionAccess = Readonly<{
  canView: boolean;
  canUpdate: boolean;
  canRestock: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
}>;

type MedicineRowProps = {
  medicine: Medicine;
  actionAccess: MedicineRowActionAccess;
  onDelete: (medicine: Medicine) => void;
};

export const MedicineRow = memo(function MedicineRow({
  medicine,
  actionAccess,
  onDelete,
}: MedicineRowProps) {
  const { t, i18n } = useTranslation('medicines', { keyPrefix: 'list' });

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {medicine.commercial_name}
        </p>
      </TableCell>
      <TableCell>
        <Badge variant={medicine.is_active ? 'success' : 'muted'}>
          {medicine.is_active ? t('active') : t('inactive')}
        </Badge>
      </TableCell>
      <TableCell>{formatPrice(medicine.price, i18n.language)}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(medicine.created_at, i18n.language, false)}
      </TableCell>

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={medicine}
          itemId={medicine.id}
          onDelete={onDelete}
          path="/dashboard/medicines"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
          {actionAccess.canUpdate ? <TableActions.Update /> : null}
          {actionAccess.canRestock ? <Restock id={medicine.id} /> : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});

function Restock({ id }: { id: number }) {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'restock',
  });

  return (
    <DropdownMenuItem asChild>
      <Link
        to={`/dashboard/medicines/${id}/restock`}
        className="cursor-pointer"
      >
        <PackagePlus className="size-4" />
        <span>{t('tooltipLabel')}</span>
      </Link>
    </DropdownMenuItem>
  );
}
