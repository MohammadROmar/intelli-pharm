import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PackagePlus, Pencil, Trash2 } from 'lucide-react';

import { useMedicineAccess } from '@/features/medicine-acces';
import { DeleteMedicineModal } from '@/features/medicine-delete';
import type { MedicineDetail } from '@/entities/medicine';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  PageHeader,
  ActionsDropdown,
} from '@/shared/ui';
import { getLocalized } from '@/shared/lib';

type Props = { medicine: MedicineDetail };

export function MedicineDetailHeader({ medicine }: Props) {
  const { t, i18n } = useTranslation('medicines', {
    keyPrefix: 'detail',
  });

  const name = getLocalized(medicine.commercial_name, i18n.language);

  return (
    <PageHeader
      title={name}
      pageTitle={`${name} · ${t('pageTitle')} - IntelliPharma`}
    >
      <MedicineActions medicine={medicine} name={name} />
    </PageHeader>
  );
}

function MedicineActions({ medicine, name }: Props & { name: string }) {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'detail',
  });

  const [medicineToDelete, setMedicineToDelete] =
    useState<MedicineDetail | null>(null);
  const navigate = useNavigate();

  const { canUpdate, canDelete, canRestock } = useMedicineAccess();

  const hasMedicineAction = canUpdate || canDelete;
  const hasAnyAction = hasMedicineAction || canRestock;

  return (
    <>
      {canDelete ? (
        <DeleteMedicineModal
          label={name}
          medicine={medicineToDelete}
          onClose={() => setMedicineToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/medicines')}
        />
      ) : null}

      {hasAnyAction ? (
        <ActionsDropdown label={t('actions')}>
          {hasMedicineAction ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs! uppercase">
                {t('medicine')}
              </DropdownMenuLabel>
              {canUpdate ? (
                <DropdownMenuItem asChild>
                  <Link
                    to={`/dashboard/medicines/${medicine.id}/edit`}
                    className="cursor-pointer"
                  >
                    <Pencil className="size-4" />
                    {t('edit')}
                  </Link>
                </DropdownMenuItem>
              ) : null}

              {canDelete ? (
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setMedicineToDelete(medicine)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
                >
                  <Trash2 className="size-4" />
                  {t('delete')}
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuGroup>
          ) : null}

          {canRestock ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs! uppercase">
                {t('stock')}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  to={`/dashboard/medicines/${medicine.id}/restock`}
                  className="cursor-pointer"
                >
                  <PackagePlus className="size-4" />
                  {t('restock')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : null}
        </ActionsDropdown>
      ) : null}
    </>
  );
}
