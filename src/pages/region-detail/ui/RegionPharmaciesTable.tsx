import { useTranslation } from 'react-i18next';
import { Cross, PackageSearch } from 'lucide-react';

import type { RegionPharmacy } from '@/entities/region';
import {
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
import { getLocalized } from '@/shared/lib';

type Props = { pharmacies: RegionPharmacy[] };

export function RegionPharmaciesTable({ pharmacies }: Props) {
  const { t, i18n } = useTranslation('regions', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('pharmaciesTitle')}
      subtitle={t('pharmaciesSubtitle')}
      icon={Cross}
      itemsCount={pharmacies.length}
    >
      {pharmacies.length === 0 ? (
        <DetailEmptyState label={t('noPharmacies')} icon={PackageSearch} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">{t('colId')}</TableHead>
              <TableHead>{t('colName')}</TableHead>
              <TableHead>{t('colPhone')}</TableHead>
              <TableHead>{t('colActions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pharmacies.map((pharmacy) => (
              <TableRow key={pharmacy.id}>
                <TableCell className="text-muted-foreground text-xs">
                  {pharmacy.id}
                </TableCell>

                <TableCell>
                  <p className="max-w-[20ch] truncate font-medium">
                    {getLocalized(pharmacy.name, i18n.language)}
                  </p>
                </TableCell>

                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm">
                    {pharmacy.pharmacist_phone}
                  </span>
                </TableCell>

                <TableActions
                  item={pharmacy}
                  itemId={pharmacy.id}
                  path="/dashboard/pharmacies"
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
