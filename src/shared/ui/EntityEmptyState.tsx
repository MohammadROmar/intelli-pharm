import { TableEmptyState } from './EmptyState';

type EntityEmptyStateProps = {
  hasActiveFilters: boolean;
  clearFilters: () => void;
};

export function EntityEmptyState({
  hasActiveFilters,
  clearFilters,
}: EntityEmptyStateProps) {
  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
