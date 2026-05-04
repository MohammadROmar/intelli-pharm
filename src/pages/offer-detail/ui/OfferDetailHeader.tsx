import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { EditOffer } from '@/features/offer-edit';
import { DeleteOfferModal } from '@/features/offer-delete';
import type { Offer } from '@/entities/offer';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { offer: Offer };

export function OfferDetailHeader({ offer }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'offersPage.detail',
  });

  const offerTitle = `OFF-${String(offer.id).padStart(6, '0')}`;

  return (
    <PageHeader
      title={offerTitle}
      pageTitle={`${offerTitle} · ${t('pageTitle')} - IntelliPharma`}
    >
      <OfferActions offer={offer} />
    </PageHeader>
  );
}

function OfferActions({ offer }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'offersPage.detail',
  });

  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  const navigate = useNavigate();

  return (
    <>
      <DeleteOfferModal
        offer={offerToDelete}
        onClose={() => setOfferToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/promotions/offers')}
      />

      <EditOffer offer={offerToEdit} onClose={() => setOfferToEdit(null)} />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem onClick={() => setOfferToEdit(offer)}>
          <Pencil className="size-4" />
          {t('edit')}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setOfferToDelete(offer)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20 w-full justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
