import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteRegionModal } from '@/features/region-delete';
import type { RegionDetail } from '@/entities/region';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';
import { getLocalized } from '@/shared/lib';
import { useRegionAccess } from '@/features/region-access';

type Props = { region: RegionDetail };

export function RegionDetailHeader({ region }: Props) {
  const { t, i18n } = useTranslation('regions', {
    keyPrefix: 'detail',
  });

  const name = getLocalized(region.name, i18n.language);

  return (
    <PageHeader
      title={name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <RegionActions region={region} name={name} />
    </PageHeader>
  );
}

function RegionActions({ region, name }: Props & { name: string }) {
  const { t } = useTranslation('regions', {
    keyPrefix: 'detail',
  });

  const [regionToDelete, setRegionToDelete] = useState<RegionDetail | null>(
    null,
  );
  const navigate = useNavigate();

  const { canUpdate, canDelete } = useRegionAccess();
  const hasAnyAction = canUpdate || canDelete;

  return (
    <>
      {canDelete && (
        <DeleteRegionModal
          label={name}
          region={regionToDelete}
          onClose={() => setRegionToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/region')}
        />
      )}

      {hasAnyAction && (
        <ActionsDropdown label={t('actions')}>
          {canUpdate && (
            <DropdownMenuItem asChild>
              <Link
                to={`/dashboard/regions/${region.id}/edit`}
                className="cursor-pointer"
              >
                <Pencil className="size-4" />
                {t('edit')}
              </Link>
            </DropdownMenuItem>
          )}

          {canDelete && (
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setRegionToDelete(region)}
              className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
            >
              <Trash2 className="size-4" />
              {t('delete')}
            </DropdownMenuItem>
          )}
        </ActionsDropdown>
      )}
    </>
  );
}
