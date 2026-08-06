import { memo, useCallback } from 'react';
import { PackageSearch, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { LaboratoryMedicine } from '@/entities/laboratory';
import { useHasPermission } from '@/entities/session';
import { formatDate, formatPrice, getLocalized } from '@/shared/lib';
import {
  Badge,
  DetailCard,
  DetailEmptyState,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { medicines: LaboratoryMedicine[] };

export function LaboratoryMedicinesTable({ medicines }: Props) {
  const { t } = useTranslation('laboratories', {
    keyPrefix: 'detail',
  });

  const canView = useHasPermission('erp.medicines.view');

  const renderRow = useCallback(
    (medicine: LaboratoryMedicine) => (
      <LaboratoryMedicineRow
        key={medicine.id}
        medicine={medicine}
        canView={canView}
      />
    ),
    [canView],
  );

  return (
    <DetailCard
      title={t('medicinesTitle')}
      subtitle={t('medicinesSubtitle')}
      icon={Pill}
      itemsCount={medicines.length}
    >
      {medicines.length === 0 ? (
        <DetailEmptyState label={t('noMedicines')} icon={PackageSearch} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">{t('colId')}</TableHead>
              <TableHead>{t('colName')}</TableHead>
              <TableHead>{t('colStatus')}</TableHead>
              <TableHead>{t('colPrice')}</TableHead>
              <TableHead>{t('colCreatedAt')}</TableHead>
              {canView ? <TableHead>{t('actions')}</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>{medicines.map(renderRow)}</TableBody>
        </Table>
      )}
    </DetailCard>
  );
}

type LaboratoryMedicineRowProps = {
  medicine: LaboratoryMedicine;
  canView: boolean;
};

const LaboratoryMedicineRow = memo(function LaboratoryMedicineRow({
  medicine,
  canView,
}: LaboratoryMedicineRowProps) {
  const { t, i18n } = useTranslation('laboratories', {
    keyPrefix: 'detail',
  });

  return (
    <TableRow>
      <TableCell className="text-muted-foreground text-xs">
        {medicine.id}
      </TableCell>
      <TableCell className="font-medium">
        <p className="max-w-[20ch] truncate font-medium">
          {getLocalized(medicine.commercial_name, i18n.language)}
        </p>
      </TableCell>
      <TableCell>
        <Badge variant={medicine.is_active ? 'success' : 'muted'}>
          {medicine.is_active ? t('active') : t('inactive')}
        </Badge>
      </TableCell>
      <TableCell className="tabular-nums">
        {formatPrice(medicine.price, i18n.language)}
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {formatDate(medicine.created_at, i18n.language, false)}
      </TableCell>
      {canView ? (
        <TableActions
          item={medicine}
          itemId={medicine.id}
          path="/dashboard/medicines"
        >
          <TableActions.Detail />
        </TableActions>
      ) : null}
    </TableRow>
  );
});
