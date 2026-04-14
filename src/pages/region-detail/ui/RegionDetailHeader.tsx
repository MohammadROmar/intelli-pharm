import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteRegionModal } from '@/features/region-delete';
import type { RegionDetail } from '@/entities/region';
import { buttonVariants } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Props = { region: RegionDetail };

export function RegionDetailHeader({ region }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.detail',
  });

  const pageTitle = `${region.name} · ${t('pageTitle')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{region.name}</h1>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            to={`/dashboard/regions/${region.id}/edit`}
            className={buttonVariants({
              variant: 'default',
              size: 'sm',
              className: 'shrink-0',
            })}
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
          <DeleteRegionBtn region={region} label={t('delete')} />
        </div>
      </div>
    </>
  );
}

function DeleteRegionBtn({ region, label }: Props & { label: string }) {
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

      <Button
        size="sm"
        onClick={() => setRegionToDelete(region)}
        variant="destructive"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
