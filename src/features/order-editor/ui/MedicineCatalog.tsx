import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LoaderCircle,
  PackageSearch,
  ScanBarcode,
  Search,
  X,
} from 'lucide-react';

import type { BarcodeScanResult, Medicine } from '@/entities/medicine';
import { useInfiniteMedicines } from '@/entities/medicine';
import { Button, Input } from '@/shared/ui';

import { medicineToCartItem } from '../lib/medicineAlternatives';
import {
  useOrderEditorActions,
  useOrderEditorState,
} from '../model/orderEditorContextValue';
import { useDebouncedValue } from '../model/useDebouncedValue';
import { MedicineAlternativesSheet } from './MedicineAlternativesSheet';
import { MedicineCatalogItem } from './MedicineCatalogItem';
import { MedicineCatalogSkeleton } from './MedicineCatalogSkeleton';
import { OrderMedicineBarcodeScanner } from './OrderMedicineBarcodeScanner';

const SEARCH_DELAY_MS = 300;

type AlternativeTarget = Pick<Medicine, 'id' | 'commercial_name'>;

type Props = {
  disabled?: boolean;
};

export function MedicineCatalog({ disabled = false }: Props) {
  const { t } = useTranslation('order-form', { keyPrefix: 'medicines' });
  const [search, setSearch] = useState('');
  const [alternativeTarget, setAlternativeTarget] =
    useState<AlternativeTarget | null>(null);
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DELAY_MS);
  const { entities: medicines, queryResult } =
    useInfiniteMedicines(debouncedSearch);
  const {
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = queryResult;
  const state = useOrderEditorState();
  const actions = useOrderEditorActions();
  const selectedIds = useMemo(
    () => new Set(state.items.map((item) => item.medicineId)),
    [state.items],
  );

  const handleAdd = useCallback(
    (medicine: Medicine) => actions.addItem(medicineToCartItem(medicine)),
    [actions],
  );
  const handleShowAlternatives = useCallback((medicine: Medicine) => {
    setAlternativeTarget({
      id: medicine.id,
      commercial_name: medicine.commercial_name,
    });
  }, []);
  const handleUnavailableScan = useCallback((medicine: BarcodeScanResult) => {
    setAlternativeTarget({
      id: medicine.id,
      commercial_name: medicine.commercial_name,
    });
  }, []);
  const handleSheetOpenChange = useCallback((open: boolean) => {
    if (!open) setAlternativeTarget(null);
  }, []);
  const handleLoadMore = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);
  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <section className="min-w-0" aria-labelledby="medicine-catalog-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 id="medicine-catalog-title" className="text-base font-semibold">
            {t('catalogTitle')}
          </h2>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {t('catalogSubtitle')}
          </p>
        </div>

        <OrderMedicineBarcodeScanner
          disabled={disabled}
          onUnavailableMedicine={handleUnavailableScan}
        />
      </div>

      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            value={search}
            icon={Search}
            autoComplete="off"
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute end-1 top-1/2 size-8 -translate-y-1/2"
              onClick={() => setSearch('')}
              aria-label={t('clearSearch')}
            >
              <X className="size-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
        <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
          <ScanBarcode className="size-3.5 shrink-0" aria-hidden="true" />
          {t('barcode.usbHint')}
        </p>
      </div>

      {isPending ? <MedicineCatalogSkeleton /> : null}

      {isError ? (
        <div className="bg-muted/20 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <PackageSearch
            className="text-destructive size-6"
            aria-hidden="true"
          />
          <h3 className="mt-3 text-sm font-semibold">{t('errorTitle')}</h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            {t('errorDescription')}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={handleRetry}
          >
            {t('retry')}
          </Button>
        </div>
      ) : null}

      {!isPending && !isError && medicines.length === 0 ? (
        <div className="bg-muted/20 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <span className="bg-muted flex size-11 items-center justify-center rounded-full">
            <PackageSearch
              className="text-muted-foreground size-5"
              aria-hidden="true"
            />
          </span>
          <h3 className="mt-3 text-sm font-semibold">{t('emptyTitle')}</h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            {t('emptyDescription')}
          </p>
        </div>
      ) : null}

      {!isError && medicines.length > 0 ? (
        <div className="space-y-3">
          {medicines.map((medicine) => (
            <MedicineCatalogItem
              key={medicine.id}
              medicine={medicine}
              selected={selectedIds.has(medicine.id)}
              onAdd={handleAdd}
              onShowAlternatives={handleShowAlternatives}
            />
          ))}
        </div>
      ) : null}

      {hasNextPage ? (
        <div className="mt-4 flex justify-center">
          <Button
            type="button"
            variant="outline"
            disabled={isFetchingNextPage}
            onClick={handleLoadMore}
            className="gap-2"
          >
            {isFetchingNextPage ? (
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            ) : null}
            {isFetchingNextPage ? t('loadingMore') : t('loadMore')}
          </Button>
        </div>
      ) : null}

      <MedicineAlternativesSheet
        target={alternativeTarget}
        selectedIds={selectedIds}
        onOpenChange={handleSheetOpenChange}
      />
    </section>
  );
}
