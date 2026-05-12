import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trophy } from 'lucide-react';

import type { Target } from '@/entities/target';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { target: Target };

export function TargetDetailHeader({ target }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'targetsPage.detail',
  });

  return (
    <PageHeader
      title={target.name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <TargetActions target={target} />
    </PageHeader>
  );
}

function TargetActions({ target }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'targetsPage.detail',
  });

  return (
    <>
      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/targets/${target.id}/edit`}
            className="cursor-pointer"
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
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
