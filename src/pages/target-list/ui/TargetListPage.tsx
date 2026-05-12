import { useState } from 'react';

import { TargetListHeader } from './TargetListHeader';
import { TargetListSkeleton } from './TargetListSkeleton';
import { useGetTargets } from '../model/useGetTargets';
import { useTargetFilters } from '../model/useTargetFilters';
import { EditTarget } from '@/features/target-edit';
import { TargetCard, type Target } from '@/entities/target';
import type { PaginatedResponse } from '@/shared/api';
import {
  QueryError,
  PerPageSelect,
  TableEmptyState,
  DynamicPagination,
} from '@/shared/ui';

const MAX_VISIBLE_PAGES = 5;

export default function TargetListPage() {
  const { data, isLoading, error, isError, refetch } = useGetTargets();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TargetListSkeleton />;
  }

  const { meta, data: targets } = data.data!;

  return (
    <>
      <TargetListHeader targets={targets.length} />
      {targets.length !== 0 ? <TargetList targets={targets} /> : <EmptyState />}
      <PageFooter meta={meta} />
    </>
  );
}

function TargetList({ targets }: { targets: Target[] }) {
  const [editingTarget, setEditingTarget] = useState<Target | null>(null);

  return (
    <>
      <EditTarget
        target={editingTarget}
        onClose={() => setEditingTarget(null)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {targets.map((target) => (
          <TargetCard
            key={target.id}
            target={target}
            setEditingTarget={setEditingTarget}
          />
        ))}
      </div>
    </>
  );
}

function PageFooter({ meta }: { meta: PaginatedResponse<undefined>['meta'] }) {
  const { current_page, per_page, total } = meta;

  const maxPages = Math.ceil(total / per_page);

  if (total === 0) return null;

  return (
    <div className="flex flex-col gap-4 sm:items-center sm:justify-between">
      <DynamicPagination
        itemsPerPage={per_page}
        maxVisiblePages={MAX_VISIBLE_PAGES}
        totalItems={total}
        basePath="/dashboard/targets"
        currentPage={current_page}
        maxPages={maxPages}
      />

      <PerPageSelect />
    </div>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useTargetFilters();

  return (
    <div className="grid h-full items-center justify-center">
      <TableEmptyState
        variant={hasActiveFilters ? 'search' : 'empty'}
        onClearSearch={clearFilters}
      />
    </div>
  );
}
