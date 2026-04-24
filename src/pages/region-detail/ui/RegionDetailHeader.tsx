import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteRegionModal } from '@/features/region-delete';
import type { RegionDetail } from '@/entities/region';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { region: RegionDetail };

export function RegionDetailHeader({ region }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.detail',
  });

  return (
    <PageHeader
      title={region.name}
      pageTitle={`${region.name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <RegionActions region={region} />
    </PageHeader>
  );
}

function RegionActions({ region }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.detail',
  });

  const [regionToDelete, setRegionToDelete] = useState<RegionDetail | null>(
    null,
  );
  const navigate = useNavigate();

  return (
    <>
      <DeleteRegionModal
        region={regionToDelete}
        onClose={() => setRegionToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/region')}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/regions/${region.id}/edit`}
            className="cursor-pointer"
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setRegionToDelete(region)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
