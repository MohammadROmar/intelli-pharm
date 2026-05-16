import { useParams } from 'react-router-dom';

import { LaboratoryInfoGrid } from './LaboratoryInfoGrid';
import { LaboratoryDetailHeader } from './LaboratoryDetailHeader';
import { LaboratoryMedicinesTable } from './LaboratoryMedicinesTable';

import { useGetLaboratorySuspense } from '@/entities/laboratory';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function LaboratoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const laboratoryId = Number(id);

  if (!id || Number.isNaN(laboratoryId)) {
    return <QueryDisabled path="/dashboard/laboratories" />;
  }

  return (
    <QueryErrorBoundary>
      <LaboratoryDetailContent laboratoryId={laboratoryId} />
    </QueryErrorBoundary>
  );
}

type LaboratoryDetailContentProps = { laboratoryId: number };

function LaboratoryDetailContent({
  laboratoryId,
}: LaboratoryDetailContentProps) {
  const { data } = useGetLaboratorySuspense(laboratoryId);

  const laboratory = data.data!;

  return (
    <div className="space-y-6">
      <LaboratoryDetailHeader laboratory={laboratory} />
      <LaboratoryInfoGrid laboratory={laboratory} />
      <LaboratoryMedicinesTable medicines={laboratory.medicines} />
    </div>
  );
}
