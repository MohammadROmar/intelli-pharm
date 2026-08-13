import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Cross, PackageSearch } from 'lucide-react';

import { useHasPermission } from '@/entities/session';
import type { RegionPharmacy } from '@/entities/region';
import { getLocalized } from '@/shared/lib';
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

type Props = { pharmacies: RegionPharmacy[] };

export function RegionPharmaciesTable({ pharmacies }: Props) {
  const { t } = useTranslation('regions', { keyPrefix: 'detail' });

  const canView = useHasPermission('erp.pharmacies.view');

  const renderRow = useCallback(
    (pharmacy: RegionPharmacy) => (
      <RegionPharmacyRow
        key={pharmacy.id}
        pharmacy={pharmacy}
        canView={canView}
      />
    ),
    [canView],
  );

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
              {canView && <TableHead>{t('colActions')}</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>{pharmacies.map(renderRow)}</TableBody>
        </Table>
      )}
    </DetailCard>
  );
}

type RegionPharmacyRowProps = {
  pharmacy: RegionPharmacy;
  canView: boolean;
};

const RegionPharmacyRow = memo(function RegionPharmacyRow({
  pharmacy,
  canView,
}: RegionPharmacyRowProps) {
  const { i18n } = useTranslation();

  return (
    <TableRow>
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
      {canView && (
        <TableActions
          item={pharmacy}
          itemId={pharmacy.id}
          path="/dashboard/pharmacies"
        >
          {canView && <TableActions.Detail />}
        </TableActions>
      )}
    </TableRow>
  );
});
