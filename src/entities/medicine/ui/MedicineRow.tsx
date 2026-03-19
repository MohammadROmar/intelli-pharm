import { useTranslation } from 'react-i18next';

import type { Medicine } from '../model/medicineTypes';
import { formatDate } from '@/shared/lib';
import { TableActions, TableCell, TableRow } from '@/shared/ui';

type MedicineRowProps = {
  medicine: Medicine;
  onDelete: (medicine: Medicine) => void;
};

export function MedicineRow({ medicine, onDelete }: MedicineRowProps) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.list',
  });

  return (
    <TableRow>
      <TableCell className="font-medium">{medicine.id}</TableCell>
      <TableCell>{medicine.name}</TableCell>
      <TableCell>{medicine.is_active ? t('active') : t('inactive')}</TableCell>
      <TableCell>{medicine.price}</TableCell>
      <TableCell>{formatDate(medicine.created_at, i18n.language)}</TableCell>

      <TableActions
        item={medicine}
        itemId={medicine.id}
        onDelete={onDelete}
        path="/dashboard/medicines"
      >
        <TableActions.Detail />
        <TableActions.Update />
        <TableActions.Delete />
      </TableActions>
    </TableRow>
  );
}
