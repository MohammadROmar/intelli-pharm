import { useTranslation } from 'react-i18next';

import type { PharmacyDetail } from '../model/pharmacyTypes';
import { TableCell, TableActions, TableRow, Badge } from '@/shared/ui';

type PharmacyRowProps = {
  pharmacy: PharmacyDetail;
  onDelete: (pharmacy: PharmacyDetail) => void;
};

export function PharmacyRow({ pharmacy, onDelete }: PharmacyRowProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.list',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {pharmacy.id}
      </TableCell>
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

      <TableActions
        item={pharmacy}
        itemId={pharmacy.id}
        onDelete={onDelete}
        path="/dashboard/pharmacies"
      >
        <TableActions.Detail />
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
