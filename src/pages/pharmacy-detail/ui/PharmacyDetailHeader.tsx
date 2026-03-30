import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import type { PharmacyDetail } from '@/entities/pharmacy';
import { buttonVariants } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyDetailHeader({ pharmacy }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">{pharmacy.name}</h1>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <Link
          to={`/dashboard/pharmacies/${pharmacy.id}/edit`}
          className={buttonVariants({
            variant: 'default',
            size: 'sm',
            className: 'shrink-0',
          })}
        >
          <Pencil className="size-4" />
          {t('edit')}
        </Link>
        <DeletePharmacyBtn pharmacy={pharmacy} label={t('delete')} />
      </div>
    </div>
  );
}

function DeletePharmacyBtn({ pharmacy, label }: Props & { label: string }) {
  const [pharmacyToDelete, setPharmacyToDelete] =
    useState<PharmacyDetail | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <DeletePharmacyModal
        pharmacy={pharmacyToDelete}
        onClose={() => setPharmacyToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/pharmacies')}
      />

      <Button
        size="sm"
        onClick={() => setPharmacyToDelete(pharmacy)}
        variant="destructive"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
