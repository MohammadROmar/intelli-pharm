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
      <TableCell className="text-muted-foreground">{pharmacy.id}</TableCell>
      <TableCell>{pharmacy.name}</TableCell>
      <TableCell>{pharmacy.region}</TableCell>
      <TableCell>{pharmacy.pharmacist_name}</TableCell>
      <TableCell className="text-muted-foreground tabular-nums">
        {pharmacy.pharmacist_phone}
      </TableCell>
      <TableCell>
        <Badge variant={pharmacy.is_active ? 'default' : 'secondary'}>
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
