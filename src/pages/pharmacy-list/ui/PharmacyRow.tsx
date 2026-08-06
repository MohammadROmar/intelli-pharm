import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Pharmacy } from '@/entities/pharmacy';
import { TableCell, TableActions, TableRow, Badge } from '@/shared/ui';

export type PharmacyRowActionAccess = Readonly<{
  canView: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  hasAnyRowAction: boolean;
}>;

type PharmacyRowProps = {
  pharmacy: Pharmacy;
  actionAccess: PharmacyRowActionAccess;
  onDelete: (pharmacy: Pharmacy) => void;
};

export const PharmacyRow = memo(function PharmacyRow({
  pharmacy,
  actionAccess,
  onDelete,
}: PharmacyRowProps) {
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'list',
  });

  return (
    <TableRow>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{pharmacy.name}</p>
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">{pharmacy.region}</p>
      </TableCell>
      <TableCell>
        <p className="max-w-[20ch] truncate font-medium">
          {pharmacy.pharmacist_name}
        </p>
      </TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {pharmacy.pharmacist_phone}
      </TableCell>
      <TableCell>
        <Badge variant={pharmacy.is_active ? 'success' : 'muted'}>
          {pharmacy.is_active ? t('active') : t('inactive')}
        </Badge>
      </TableCell>

      {actionAccess.hasAnyRowAction ? (
        <TableActions
          item={pharmacy}
          itemId={pharmacy.id}
          onDelete={onDelete}
          path="/dashboard/pharmacies"
        >
          {actionAccess.canView ? <TableActions.Detail /> : null}
          {actionAccess.canUpdate ? <TableActions.Update /> : null}
          {actionAccess.canDelete ? <TableActions.Delete /> : null}
        </TableActions>
      ) : null}
    </TableRow>
  );
});
