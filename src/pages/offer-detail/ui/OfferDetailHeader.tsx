import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { EditOffer } from '@/features/offer-edit';
import { useOfferAccess } from '@/features/offer-access';
import { DeleteOfferModal } from '@/features/offer-delete';
import type { Offer } from '@/entities/offer';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { offer: Offer };

export function OfferDetailHeader({ offer }: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'detail' });

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
  const { t } = useTranslation('offers', { keyPrefix: 'detail' });

  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  const navigate = useNavigate();

  const { canUpdate, canDelete } = useOfferAccess();
  const hasAnyAction = canUpdate || canDelete;

  return (
    <>
      {canDelete && (
        <DeleteOfferModal
          offer={offerToDelete}
          onClose={() => setOfferToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/promotions/offers')}
        />
      )}

      {canUpdate && (
        <EditOffer offer={offerToEdit} onClose={() => setOfferToEdit(null)} />
      )}

      {hasAnyAction && (
        <ActionsDropdown label={t('actions')}>
          {canUpdate && (
            <DropdownMenuItem onSelect={() => setOfferToEdit(offer)}>
              <Pencil className="size-4" />
              {t('edit')}
            </DropdownMenuItem>
          )}

          {canDelete && (
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setOfferToDelete(offer)}
              className="text-destructive hover:text-destructive hover:bg-destructive/20 w-full justify-start"
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
