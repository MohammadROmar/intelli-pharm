import { PackageSearch, Pill } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { LaboratoryMedicine } from '@/entities/laboratory';
import { formatDate, formatPrice } from '@/shared/lib';
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
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.detail',
  });

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
              <TableHead>{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="text-muted-foreground text-xs">
                  {medicine.id}
                </TableCell>

                <TableCell className="font-medium">
                  <p className="max-w-[20ch] truncate font-medium">
                    {medicine.commercial_name}
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
                <TableActions
                  item={medicine}
                  itemId={medicine.id}
                  path="/dashboard/medicines"
                >
                  <TableActions.Detail />
                </TableActions>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DetailCard>
  );
}
