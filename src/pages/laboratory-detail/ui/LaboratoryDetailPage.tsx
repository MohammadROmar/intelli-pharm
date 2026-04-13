import { LaboratoryInfoGrid } from './LaboratoryInfoGrid';
import { LaboratoryDetailHeader } from './LaboratoryDetailHeader';
import { LaboratoryMedicinesTable } from './LaboratoryMedicinesTable';

import { useGetLaboratory } from '@/entities/laboratory';
import { DetailSkeleton, QueryDisabled, QueryError } from '@/shared/ui';

export default function LaboratoryDetailPage() {
  const { data, isLoading, isEnabled, isError, error, refetch } =
    useGetLaboratory();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/laboratories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 3 }]} tables={1} />;
  }

  const laboratory = data.data!;

  return (
    <div className="space-y-6">
      <LaboratoryDetailHeader laboratory={laboratory} />
      <LaboratoryInfoGrid laboratory={laboratory} />
      <LaboratoryMedicinesTable medicines={laboratory.medicines} />
    </div>
  );
}
