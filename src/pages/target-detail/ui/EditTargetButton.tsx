import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';

import { EditTarget } from '@/features/target-edit';
import type { Target } from '@/entities/target';
import { Button } from '@/shared/ui';

type Props = { target: Target };

export function EditTargetButton({ target }: Props) {
  const [editingTarget, setEditingTarget] = useState<Target | null>(null);

  const { t } = useTranslation('translation', { keyPrefix: 'targetsPage' });

  return (
    <>
      <EditTarget
        target={editingTarget}
        onClose={() => setEditingTarget(null)}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => setEditingTarget(target)}
        className="bg-card! gap-1.5"
      >
        <Pencil className="size-3.5" />
        {t('editButton')}
      </Button>
    </>
  );
}
