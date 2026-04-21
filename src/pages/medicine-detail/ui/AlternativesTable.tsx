import { PackageSearch, Repeat2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { AlternativeMedicine } from '@/entities/medicine';
import { formatPrice } from '@/shared/lib';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableActions,
  DetailCard,
  DetailEmptyState,
} from '@/shared/ui';

type Props = {
  alternatives: AlternativeMedicine[];
  mode: 'alternatives' | 'alternativeFor';
};

export function AlternativesTable({ alternatives, mode }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage',
  });

  return (
    <DetailCard
      title={t(`detail.${mode}.title`)}
      subtitle={t(`detail.${mode}.subtitle`)}
      icon={Repeat2}
      itemsCount={alternatives.length}
    >
      {alternatives.length === 0 ? (
        <DetailEmptyState
          label={t(`detail.${mode}.noAlts`)}
          icon={PackageSearch}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('list.id')}</TableHead>
              <TableHead>{t('list.name')}</TableHead>
              <TableHead className="max-w-xs">{t('list.price')}</TableHead>
              <TableHead className="max-w-xs">{t('list.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alternatives.map((alt) => (
              <TableRow key={alt.id}>
                <TableCell className="text-muted-foreground">
                  {alt.id}
                </TableCell>
                <TableCell>{alt.commercial_name}</TableCell>
                <TableCell className="tabular-nums">
                  {formatPrice(alt.price, i18n.language)}
                </TableCell>
                <TableActions
                  itemId={alt.id}
                  item={alt}
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
