import { Suspense, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GitCompareArrows, PackageSearch } from 'lucide-react';

import type { AlternativeMedicine } from '@/entities/medicine';
import { useGetMedicineSuspense } from '@/entities/medicine';
import { unwrapApiResponse } from '@/shared/api';
import {
  CardSectionHeader,
  QueryErrorBoundary,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Skeleton,
} from '@/shared/ui';

import {
  alternativeToCartItem,
  mergeMedicineAlternatives,
} from '../lib/medicineAlternatives';
import { useOrderEditorActions } from '../model/orderEditorContextValue';
import { AlternativeMedicineItem } from './AlternativeMedicineItem';

type Target = { id: number; commercial_name: string };

type Props = {
  target: Target | null;
  selectedIds: ReadonlySet<number>;
  onOpenChange: (open: boolean) => void;
};

export function MedicineAlternativesSheet({
  target,
  selectedIds,
  onOpenChange,
}: Props) {
  const { t, i18n } = useTranslation('order-form', {
    keyPrefix: 'alternatives',
  });
  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={target !== null} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="w-full sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle', { medicine: target?.commercial_name ?? '' })}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle', {
              medicine: target?.commercial_name ?? '',
            })}
            icon={GitCompareArrows}
            aria-hidden
          />
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-0">
          {target ? (
            <QueryErrorBoundary>
              <Suspense fallback={<AlternativesSkeleton />}>
                <MedicineAlternativesContent
                  medicineId={target.id}
                  selectedIds={selectedIds}
                />
              </Suspense>
            </QueryErrorBoundary>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MedicineAlternativesContent({
  medicineId,
  selectedIds,
}: {
  medicineId: number;
  selectedIds: ReadonlySet<number>;
}) {
  const { t, i18n } = useTranslation('order-form', {
    keyPrefix: 'alternatives',
  });
  const { data: response } = useGetMedicineSuspense(medicineId);
  const medicine = unwrapApiResponse(response);
  const actions = useOrderEditorActions();
  const language: 'ar' | 'en' = i18n.resolvedLanguage === 'ar' ? 'ar' : 'en';
  const alternatives = useMemo(
    () =>
      mergeMedicineAlternatives(
        medicine.id,
        medicine.alternatives,
        medicine.alternative_for,
      ),
    [medicine],
  );
  const handleAdd = useCallback(
    (alternative: AlternativeMedicine) => {
      actions.addItem(alternativeToCartItem(alternative, language));
    },
    [actions, language],
  );

  if (alternatives.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-12 text-center">
        <span className="bg-muted flex size-11 items-center justify-center rounded-full">
          <PackageSearch
            className="text-muted-foreground size-5"
            aria-hidden="true"
          />
        </span>
        <h3 className="mt-3 text-sm font-semibold">{t('emptyTitle')}</h3>
        <p className="text-muted-foreground mt-1 text-xs">
          {t('emptyDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alternatives.map((alternative) => (
        <AlternativeMedicineItem
          key={alternative.id}
          medicine={alternative}
          selected={selectedIds.has(alternative.id)}
          language={language}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}

function AlternativesSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="rounded-xl border p-3.5">
          <div className="flex gap-3">
            <Skeleton className="size-12 rounded-lg" />
            <div className="flex-1 space-y-2.5">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
