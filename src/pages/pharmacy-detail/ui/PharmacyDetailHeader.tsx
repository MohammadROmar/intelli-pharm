import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { DeletePharmacyModal } from '@/features/pharmacy-delete';
import { AddPharmacyNoteDialog } from '@/features/pharmacy-notes';
import type { PharmacyDetail } from '@/entities/pharmacy';
import { getLocalized } from '@/shared/lib';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { pharmacy: PharmacyDetail };

export function PharmacyDetailHeader({ pharmacy }: Props) {
  const { t, i18n } = useTranslation('pharmacies', { keyPrefix: 'detail' });
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
  const { t } = useTranslation('pharmacies', { keyPrefix: 'detail' });
  const navigate = useNavigate();

  const [pharmacyToDelete, setPharmacyToDelete] =
    useState<PharmacyDetail | null>(null);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);

  return (
    <>
      <DeletePharmacyModal
        label={name}
        pharmacy={pharmacyToDelete}
        onClose={() => setPharmacyToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/pharmacies')}
      />

      <AddPharmacyNoteDialog
        pharmacyId={pharmacy.id}
        open={noteDialogOpen}
        onOpenChange={setNoteDialogOpen}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem
          onClick={() => setNoteDialogOpen(true)}
          className="cursor-pointer"
        >
          <Plus className="size-4" />
          {t('addNote')}
        </DropdownMenuItem>

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
