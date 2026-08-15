import { useCallback, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';

import { DEBT_STATUSES, isDebtStatus } from '@/entities/debt';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import type { useDebtFilters } from '../model/useDebtFilters';

const ALL_STATUSES = 'all';

type Props = ReturnType<typeof useDebtFilters>;

export function DebtFiltersBar({
  filters,
  applyFilters,
  clearFilters,
  activeCount,
  hasActiveFilters,
}: Props) {
  const { t } = useTranslation('debts', { keyPrefix: 'list.filters' });
  const pharmacyName = filters.pharmacy_name ?? '';
  const selectedStatus = filters.status ?? ALL_STATUSES;

  const statusOptions = useMemo(
    () => [
      { value: ALL_STATUSES, label: t('allStatuses') },
      ...DEBT_STATUSES.map((status) => ({
        value: status,
        label: t(`statuses.${status}`),
      })),
    ],
    [t],
  );

  const handleSearch = useCallback(
    (value: string) => {
      applyFilters({
        ...filters,
        pharmacy_name: value || undefined,
      });
    },
    [applyFilters, filters],
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      applyFilters({
        ...filters,
        status: isDebtStatus(value) ? value : undefined,
      });
    },
    [applyFilters, filters],
  );

  return (
    <section
      aria-label={t('ariaLabel')}
      className="bg-card rounded-2xl border p-4 shadow-sm"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <DebtSearchForm
          key={pharmacyName}
          initialValue={pharmacyName}
          label={t('pharmacyLabel')}
          placeholder={t('pharmacyPlaceholder')}
          submitLabel={t('search')}
          onSearch={handleSearch}
        />

        <div className="w-full lg:w-60">
          <label
            htmlFor="debt-status-filter"
            className="text-muted-foreground mb-1.5 block text-xs font-medium"
          >
            {t('statusLabel')}
          </label>
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger id="debt-status-filter" className="w-full!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters ? (
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            className="text-muted-foreground lg:ms-auto"
          >
            <X className="size-4" aria-hidden="true" />
            {t('clear', { count: activeCount })}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

type SearchFormProps = {
  initialValue: string;
  label: string;
  placeholder: string;
  submitLabel: string;
  onSearch: (value: string) => void;
};

function DebtSearchForm({
  initialValue,
  label,
  placeholder,
  submitLabel,
  onSearch,
}: SearchFormProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="min-w-0 flex-1">
      <label
        htmlFor="debt-pharmacy-search"
        className="text-muted-foreground mb-1.5 block text-xs font-medium"
      >
        {label}
      </label>
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search
            className="text-muted-foreground pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              id="debt-pharmacy-search"
              type="search"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={placeholder}
              autoComplete="off"
              className="ps-9! pe-9! [&::-webkit-search-cancel-button]:appearance-none"
            />
            {value && (
              <button
                type="button"
                onClick={() => setValue('')}
                className="text-muted-foreground hover:text-foreground absolute end-3 top-1/2 -translate-y-1/2"
                aria-label="Clear"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        <Button type="submit">
          <Search className="size-4 sm:hidden" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">{submitLabel}</span>
        </Button>
      </div>
    </form>
  );
}
