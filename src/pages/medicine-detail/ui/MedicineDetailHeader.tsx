import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MoreHorizontal, PackagePlus, Pencil, Trash2 } from 'lucide-react';

import { DeleteMedicineModal } from '@/features/medicine-delete';
import type { Medicine } from '@/entities/medicine';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui';

type Props = { medicine: Medicine };

export function MedicineDetailHeader({ medicine }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  const pageTitle = `${medicine.name} | ${t('pageTitle')} - IntelliPharm`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{medicine.name}</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal />
              {t('actions')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs! uppercase">
                {t('medicine')}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  to={`/dashboard/medicines/${medicine.id}/edit`}
                  className="cursor-pointer"
                >
                  <Pencil className="size-4" />
                  {t('edit')}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild variant="destructive">
                <DeleteMedicineBtn medicine={medicine} label={t('delete')} />
              </DropdownMenuItem>
            </DropdownMenuGroup>

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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

function DeleteMedicineBtn({ medicine, label }: Props & { label: string }) {
  const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(
    null,
  );
  const navigate = useNavigate();

  return (
    <>
      <DeleteMedicineModal
        medicine={medicineToDelete}
        onClose={() => setMedicineToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/medicines')}
      />

      <Button
        size="sm"
        onClick={() => setMedicineToDelete(medicine)}
        variant="ghost"
        className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
      >
        <Trash2 className="size-4" />
        {label}
      </Button>
    </>
  );
}
