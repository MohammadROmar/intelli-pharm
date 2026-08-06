import { useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trophy } from 'lucide-react';

import { EditTarget } from '@/features/target-edit';
import type { Target } from '@/entities/target';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { target: Target };

export function TargetDetailHeader({ target }: Props) {
  const { t } = useTranslation('targets', {
    keyPrefix: 'detail',
  });

  return (
    <PageHeader
      title={target.name}
      pageTitle={`${target.name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <TargetActions target={target} />
    </PageHeader>
  );
}

function TargetActions({ target }: Props) {
  const { t } = useTranslation('targets', {
    keyPrefix: 'detail',
  });

  const [editingTarget, setEditingTarget] = useState<Target | null>(null);

  return (
    <>
      <EditTarget
        target={editingTarget}
        onClose={() => setEditingTarget(null)}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem onSelect={() => setEditingTarget(target)}>
          <Pencil className="size-4" />
          {t('edit')}
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="achievements">
            <Trophy className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />
            {t('achievementsButton')}
          </Link>
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
