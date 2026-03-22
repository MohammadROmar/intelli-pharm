import { PackageSearch, Repeat2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { MedicineDetailCard } from './MedicineDetailCard';
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
    <MedicineDetailCard
      title={t(`detail.${mode}.title`)}
      subtitle={t(`detail.${mode}.subtitle`)}
      icon={Repeat2}
      itemsCount={alternatives.length}
    >
      {alternatives.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center gap-2 py-10">
          <PackageSearch className="size-8" />
          <p className="text-sm">{t(`detail.${mode}.noAlts`)}</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('list.name')}</TableHead>
              <TableHead>{t('list.status')}</TableHead>
              <TableHead className="max-w-xs">{t('list.price')}</TableHead>
              <TableHead className="max-w-xs">{t('list.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alternatives.map((alt) => (
              <TableRow key={alt.id}>
                <TableCell className="font-medium">{alt.name}</TableCell>
                <TableCell>
                  {alt.is_active ? t('list.active') : t('list.inactive')}
                </TableCell>
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
    </MedicineDetailCard>
  );
}
