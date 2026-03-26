import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LaboratoryInfoGrid } from './LaboratoryInfoGrid';
import { LaboratoryMedicinesTable } from './LaboratoryMedicinesTable';
import { LaboratoryEditButton } from '@/features/laboratory-edit';
import { DeleteLaboratoryModal } from '@/features/laboratory-delete';
import type { LaboratoryDetail } from '@/entities/laboratory';
import { Button } from '@/shared/ui';

type Props = { laboratory: LaboratoryDetail };

export function LaboratoryDetail({ laboratory }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.detail',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{laboratory.name}</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <LaboratoryEditButton
            id={laboratory.id}
            defaultName={laboratory.name}
          />
          <DeleteLaboratoryBtn laboratory={laboratory} label={t('delete')} />
        </div>
      </div>

      <LaboratoryInfoGrid laboratory={laboratory} />

      <LaboratoryMedicinesTable medicines={laboratory.medicines} />
    </div>
  );
}

function DeleteLaboratoryBtn({ laboratory, label }: Props & { label: string }) {
  const [labToDelete, setLabToDelete] = useState<LaboratoryDetail | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DeleteLaboratoryModal
        laboratory={labToDelete}
        onClose={() => setLabToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/laboratories')}
      />

      <Button
        size="sm"
        onClick={() => setLabToDelete(laboratory)}
        variant="destructive"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
