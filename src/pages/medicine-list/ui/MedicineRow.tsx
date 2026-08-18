import { memo, type ElementType } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PackagePlus, Pencil } from 'lucide-react';

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
  canUpdate: boolean;
  canUpdateStock: boolean;
  canDelete: boolean;
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

      <TableActions
        item={medicine}
        itemId={medicine.id}
        onDelete={onDelete}
        path="/dashboard/medicines"
      >
        <TableActions.Detail />

        {actionAccess.canUpdate && <TableActions.Update />}

        {actionAccess.canUpdateStock && (
          <>
            <MedicineStockAction
              to={`/dashboard/medicines/${medicine.id}/restock`}
              icon={PackagePlus}
              label={t('restock')}
            />

            <MedicineStockAction
              to={`/dashboard/medicines/${medicine.id}/edit-stock`}
              icon={Pencil}
              label={t('editStock')}
            />
          </>
        )}

        {actionAccess.canDelete && <TableActions.Delete />}
      </TableActions>
    </TableRow>
  );
});

type MedicineStockActionProps = {
  to: string;
  icon: ElementType;
  label: string;
};

function MedicineStockAction({
  to,
  label,
  icon: Icon,
}: MedicineStockActionProps) {
  return (
    <DropdownMenuItem asChild>
      <Link to={to} className="cursor-pointer">
        <Icon className="size-4" />
        <span>{label}</span>
      </Link>
    </DropdownMenuItem>
  );
}
