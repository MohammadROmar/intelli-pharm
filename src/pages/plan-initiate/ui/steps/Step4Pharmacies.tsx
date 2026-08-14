import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Check,
  Clock,
  Cross,
  Loader2,
  MapPin,
  Phone,
  Search,
  X,
} from 'lucide-react';

import type { ApiError } from '@/shared/api';
import { type Pharmacy, useInfinitePharmacies } from '@/entities/pharmacy';
import { cn, formatTime, useDebounce, useLatestRef } from '@/shared/lib';
import {
  AccessDeniedSection,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Input,
  QueryError,
  Skeleton,
} from '@/shared/ui';
import { WizardNavigation } from '@/features/plan-initiate-wizard';

import { TOTAL_STEPS } from '../../model/plannerWizardTypes';
import { usePlannerWizard } from '../../model/store';

const MAX_SELECTED_PHARMACIES = 19;
const SELECTED_PHARMACIES_PREVIEW_LIMIT = 8;

type PharmacyCardProps = {
  pharmacy: Pharmacy;
  selected: boolean;
  language: string;
  onToggle: (id: number) => void;
};

const PharmacyCard = memo(function PharmacyCard({
  pharmacy,
  selected,
  language,
  onToggle,
}: PharmacyCardProps) {
  const handleToggle = () => {
    onToggle(pharmacy.id);
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={handleToggle}
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
              <MapPin aria-hidden="true" className="size-3 shrink-0" />
              {pharmacy.region}
            </span>

            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Phone aria-hidden="true" className="size-3 shrink-0" />
              {pharmacy.pharmacist_phone}
            </span>

            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Clock aria-hidden="true" className="size-3 shrink-0" />
              {formatTime(pharmacy.opening_time, language)} –{' '}
              {formatTime(pharmacy.closing_time, language)}
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-all',
            selected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/40 group-hover:border-primary/50',
          )}
        >
          {selected ? (
            <Check className="text-primary-foreground size-3" />
          ) : null}
        </div>
      </div>
    </button>
  );
});

type PharmacyListProps = {
  selectedIds: number[];
  searchTerm: string;
  regionId: number | null;
  onToggle: (id: number) => void;
};

function PharmacyList({
  selectedIds,
  searchTerm,
  regionId,
  onToggle,
}: PharmacyListProps) {
  const { t, i18n } = useTranslation('planner');

  const { entities: pharmacies, queryResult } = useInfinitePharmacies(
    searchTerm,
    { region: regionId },
  );

  const {
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = queryResult;

  if (isError) {
    return <QueryError error={error as ApiError} onRetry={refetch} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (pharmacies.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center gap-2 py-12 text-center">
        <Cross aria-hidden="true" className="size-8" />
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
            language={i18n.language}
            selected={selectedIds.includes(pharmacy.id)}
            onToggle={onToggle}
          />
        ))}
      </div>

      {hasNextPage ? (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isFetchingNextPage}
            onClick={() => void fetchNextPage()}
            className="gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                {t('pharmacies.loadingMore')}
              </>
            ) : (
              t('pharmacies.loadMore')
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function Step4PharmaciesContent() {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const selectedIds = state.pharmacies.pharmacy_ids;
  const regionId = state.assignment.region_id;
  const hasSelection = selectedIds.length > 0;

  const selectedIdsRef = useLatestRef(selectedIds);

  const togglePharmacy = useCallback(
    (id: number) => {
      const currentSelectedIds = selectedIdsRef.current;

      if (currentSelectedIds.includes(id)) {
        dispatch({
          type: 'UPDATE_PHARMACIES',
          payload: {
            pharmacy_ids: currentSelectedIds.filter(
              (pharmacyId) => pharmacyId !== id,
            ),
          },
        });

        return;
      }

      if (currentSelectedIds.length >= MAX_SELECTED_PHARMACIES) {
        toast.warning(t('pharmacies.maxLimitReached'));
        return;
      }

      dispatch({
        type: 'UPDATE_PHARMACIES',
        payload: {
          pharmacy_ids: [...currentSelectedIds, id],
        },
      });
    },
    [dispatch, selectedIdsRef, t],
  );

  const clearSelection = useCallback(() => {
    dispatch({
      type: 'UPDATE_PHARMACIES',
      payload: { pharmacy_ids: [] },
    });
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardSectionHeader
            title={t('pharmacies.cardTitle')}
            description={t('pharmacies.cardSubtitle')}
            icon={Cross}
          />

          {hasSelection ? (
            <Badge variant="secondary" className="shrink-0 tabular-nums">
              {t('pharmacies.selectedCount', {
                count: selectedIds.length,
              })}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2"
          />

          <Input
            id="pharmacy_name_search"
            type="search"
            placeholder={t('pharmacies.searchPlaceholder')}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="ps-9"
          />
        </div>

        {hasSelection ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-muted-foreground text-xs">
              {t('pharmacies.selected')}:
            </span>

            {selectedIds
              .slice(0, SELECTED_PHARMACIES_PREVIEW_LIMIT)
              .map((id) => {
                const formattedId = `PH-${String(id).padStart(6, '0')}`;

                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="cursor-pointer gap-1 text-xs"
                    onClick={() => togglePharmacy(id)}
                  >
                    {formattedId}
                    <X aria-hidden="true" className="size-2.5" />
                  </Badge>
                );
              })}

            {selectedIds.length > SELECTED_PHARMACIES_PREVIEW_LIMIT ? (
              <Badge variant="outline" className="text-xs">
                +{selectedIds.length - SELECTED_PHARMACIES_PREVIEW_LIMIT}
              </Badge>
            ) : null}

            <button
              type="button"
              onClick={clearSelection}
              className="text-muted-foreground hover:text-foreground ms-1 text-xs transition-colors"
            >
              {t('pharmacies.clearAll')}
            </button>
          </div>
        ) : null}

        <PharmacyList
          selectedIds={selectedIds}
          searchTerm={debouncedSearchTerm}
          regionId={regionId}
          onToggle={togglePharmacy}
        />
      </CardContent>
    </Card>
  );
}

type Step4PharmaciesProps = {
  canView: boolean;
  onSubmit: () => void;
  isPending?: boolean;
};

export function Step4Pharmacies({
  canView,
  onSubmit,
  isPending = false,
}: Step4PharmaciesProps) {
  const { t } = useTranslation('planner');
  const { state, dispatch } = usePlannerWizard();

  const hasSelection = state.pharmacies.pharmacy_ids.length > 0;
  const canSubmit = canView && hasSelection && !isPending;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      return;
    }

    onSubmit();
  }, [canSubmit, onSubmit]);

  return (
    <div className="space-y-6">
      {canView ? (
        <Step4PharmaciesContent />
      ) : (
        <AccessDeniedSection
          title={t('pharmacies.accessDenied.title')}
          subtitle={t('pharmacies.accessDenied.subtitle')}
          badge={t('pharmacies.accessDenied.badge')}
        />
      )}

      <WizardNavigation
        step={state.step}
        dispatch={dispatch}
        totalSteps={TOTAL_STEPS}
        canProceed={canSubmit}
        isSubmitting={canView && isPending}
        onSubmit={handleSubmit}
        nextLabel={t('nav.submit')}
      />
    </div>
  );
}
