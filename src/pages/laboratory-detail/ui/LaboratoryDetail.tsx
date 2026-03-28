import { LaboratoryInfoGrid } from './LaboratoryInfoGrid';
import { LaboratoryMedicinesTable } from './LaboratoryMedicinesTable';
import type { LaboratoryDetail } from '@/entities/laboratory';
import { LaboratoryDetailHeader } from './LaboratoryDetailHeader';

type Props = { laboratory: LaboratoryDetail };

export function LaboratoryDetail({ laboratory }: Props) {
  return (
    <div className="space-y-6">
      <LaboratoryDetailHeader laboratory={laboratory} />
      <LaboratoryInfoGrid laboratory={laboratory} />
      <LaboratoryMedicinesTable medicines={laboratory.medicines} />
    </div>
  );
}
