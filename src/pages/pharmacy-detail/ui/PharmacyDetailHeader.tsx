import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import type { PharmacyDetail } from '@/entities/pharmacy';
import { getLocalized } from '@/shared/lib';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyDetailHeader({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });

  const name = getLocalized(pharmacy.name, i18n.language);

  return (
    <PageHeader
      title={name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <PharmacyActions pharmacy={pharmacy} name={name} />
    </PageHeader>
  );
}

function PharmacyActions({ pharmacy, name }: Props & { name: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pharmaciesPage.detail',
  });
  const navigate = useNavigate();

  const [pharmacyToDelete, setPharmacyToDelete] =
    useState<PharmacyDetail | null>(null);

  return (
    <>
      <DeletePharmacyModal
        label={name}
        pharmacy={pharmacyToDelete}
        onClose={() => setPharmacyToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/pharmacies')}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/pharmacies/${pharmacy.id}/edit`}
            className="cursor-pointer"
          >
            <Pencil className="size-4" />
            {t('edit')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setPharmacyToDelete(pharmacy)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full cursor-pointer justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
