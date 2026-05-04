import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteOfferModal } from '@/features/offer-delete';
import { AddOfferButton, OfferRow } from '@/entities/offer';
import type { Offer, OfferResponse } from '@/entities/offer';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
} from '@/shared/ui';
import { EditOffer } from '@/features/offer-edit';

type Props = { data: OfferResponse };

export function OffersTable({ data }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'offersPage.list' });

  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  const offers = data.data;

  return (
    <>
      <EditOffer offer={offerToEdit} onClose={() => setOfferToEdit(null)} />

      <DeleteOfferModal
        offer={offerToDelete}
        onClose={() => setOfferToDelete(null)}
      />

      <TableCard
        title={t('all')}
        currItemsCount={offers.length}
        toolbar={<AddOfferButton />}
        basePath="/dashboard/offers"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {offers.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('id')}</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('requiredAmount')}</TableHead>
                <TableHead>{t('benefit')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.map((offer) => (
                <OfferRow
                  key={offer.id}
                  offer={offer}
                  onDelete={setOfferToDelete}
                  onEdit={setOfferToEdit}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <TableEmptyState variant="empty" />
        )}
      </TableCard>
    </>
  );
}
