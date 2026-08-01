import { useState, type ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

import { FiltersTrigger } from './FiltersModal';

type FiltersState<TFilters> = {
  filters: TFilters;
  applyFilters: (values: TFilters) => void;
  clearFilters: () => void;
  activeCount: number;
  hasActiveFilters: boolean;
};

export type FiltersModalProps<TFilters> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: TFilters;
  hasActiveFilters: boolean;
  onApply: (values: TFilters) => void;
  onClear: () => void;
};

type EntityFiltersToolbarProps<TFilters> = {
  label?: string;
  icon?: LucideIcon;
  triggerClassName?: string;
  filtersState: FiltersState<TFilters>;
  FiltersModal: ComponentType<FiltersModalProps<TFilters>>;
};

export function EntityFiltersToolbar<TFilters>({
  label,
  icon,
  triggerClassName,
  filtersState,
  FiltersModal,
}: EntityFiltersToolbarProps<TFilters>) {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    filtersState;

  return (
    <>
      <FiltersTrigger
        label={label}
        icon={icon}
        triggerClassName={triggerClassName}
        onClick={() => setOpen(true)}
        activeCount={activeCount}
      />
      <FiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(values) => {
          applyFilters(values);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}
