import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Cross,
  Check,
  Clock,
  MapPin,
  Phone,
  Search,
  X,
  Loader2,
} from 'lucide-react';

import type { ApiError } from '@/shared/api';
import { useInfinitePharmacies, type Pharmacy } from '@/entities/pharmacy';
import { cn, useDebounce } from '@/shared/lib';
import {
  Badge,
  Input,
  Skeleton,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Button,
  QueryError,
} from '@/shared/ui';

import { WizardNavigation } from '../WizardNavigation';
import { usePlannerWizard } from '../../model/PlannerWizardContext';

function PharmacyCard({
  pharmacy,
  selected,
  onToggle,
}: {
  pharmacy: Pharmacy;
  selected: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(pharmacy.id)}
      className={cn(
        'group w-full rounded-xl border-2 p-4 text-start transition-all',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-muted-foreground/30 hover:bg-muted/30',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="truncate text-sm font-semibold">{pharmacy.name}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <MapPin className="size-3 shrink-0" />
              {pharmacy.region}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Phone className="size-3 shrink-0" />
              {pharmacy.pharmacist_phone}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock className="size-3 shrink-0" />
              {pharmacy.opening_time.slice(0, 5)} –{' '}
              {pharmacy.closing_time.slice(0, 5)}
            </span>
          </div>
        </div>
        <div
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
            selected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/40 group-hover:border-primary/50',
          )}
        >
          {selected && <Check className="text-primary-foreground size-3" />}
        </div>
      </div>
    </button>
  );
}

function PharmacyList({
  selectedIds,
  searchTerm,
  onToggle,
  regionId,
}: {
  selectedIds: number[];
  searchTerm: string;
  onToggle: (id: number) => void;
  regionId: number | null;
}) {
  const { t } = useTranslation('planner');

  const { entities: pharmacies, queryResult } = useInfinitePharmacies(
    searchTerm,
    { region: regionId },
  );
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = queryResult;

  if (isError) {
    return <QueryError error={error as ApiError} onRetry={refetch} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!pharmacies.length) {
    return (
      <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-center">
        <Cross className="size-8" />
        <p className="text-sm">{t('pharmacies.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pharmacies.map((pharmacy) => (
          <PharmacyCard
            key={pharmacy.id}
            pharmacy={pharmacy}
            selected={selectedIds.includes(pharmacy.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="flex size-4 animate-spin items-center justify-center" />
                {t('pharmacies.loadingMore')}
              </>
            ) : (
              t('pharmacies.loadMore')
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

type Props = { onSubmit: () => void; isPending?: boolean };

export function Step4Pharmacies({ onSubmit, isPending }: Props) {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const selectedIds = state.pharmacies.pharmacy_ids;
  const regionId = state.assignment.region_id;
  const hasSelection = selectedIds.length > 0;

  const togglePharmacy = useCallback(
    (id: number) => {
      const next = selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id];
      dispatch({ type: 'UPDATE_PHARMACIES', payload: { pharmacy_ids: next } });
    },
    [selectedIds, dispatch],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardSectionHeader
                title={t('pharmacies.cardTitle')}
                description={t('pharmacies.cardSubtitle')}
                icon={Cross}
              />
            </div>
            {hasSelection && (
              <Badge variant="secondary" className="shrink-0 tabular-nums">
                {t('pharmacies.selectedCount', { count: selectedIds.length })}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="pharmacy_name_search"
              placeholder={t('pharmacies.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {hasSelection && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-muted-foreground text-xs">
                {t('pharmacies.selected')}:
              </span>
              {selectedIds.slice(0, 8).map((id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="cursor-pointer gap-1 text-xs"
                  onClick={() => togglePharmacy(id)}
                >
                  PH-{String(id).padStart(6, '0')}
                  <X className="size-2.5" />
                </Badge>
              ))}
              {selectedIds.length > 8 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedIds.length - 8}
                </Badge>
              )}
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: 'UPDATE_PHARMACIES',
                    payload: { pharmacy_ids: [] },
                  })
                }
                className="text-muted-foreground hover:text-foreground ml-1 text-xs transition-colors"
              >
                {t('pharmacies.clearAll')}
              </button>
            </div>
          )}

          <PharmacyList
            selectedIds={selectedIds}
            searchTerm={debouncedSearchTerm}
            onToggle={togglePharmacy}
            regionId={regionId}
          />
        </CardContent>
      </Card>

      <WizardNavigation
        canProceed={hasSelection}
        isSubmitting={isPending}
        onSubmit={onSubmit}
        nextLabel={t('nav.submit')}
      />
    </div>
  );
}
