import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditOffer } from '@/features/offer-edit';
import { DeleteOfferModal } from '@/features/offer-delete';
import { AddOfferButton } from '@/entities/offer';
import type { Offer, OfferResponse } from '@/entities/offer';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { OfferRow } from './OfferRow';

type Props = { data: OfferResponse };

export function OffersTable({ data }: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'list' });

  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  return (
    <>
      <EditOffer offer={offerToEdit} onClose={() => setOfferToEdit(null)} />

      <DeleteOfferModal
        offer={offerToDelete}
        onClose={() => setOfferToDelete(null)}
      />

      <EntityListTable
        data={data}
        title={t('all')}
        toolbar={<AddOfferButton />}
        basePath="/dashboard/offers"
        columns={
          <>
            <TableHead className="w-25">{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('requiredAmount')}</TableHead>
            <TableHead>{t('benefit')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </>
        }
        renderRow={(offer) => (
          <OfferRow
            key={offer.id}
            offer={offer}
            onDelete={setOfferToDelete}
            onEdit={setOfferToEdit}
          />
        )}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
