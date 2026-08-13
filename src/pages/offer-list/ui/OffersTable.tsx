import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditOffer } from '@/features/offer-edit';
import { useOfferAccess } from '@/features/offer-access';
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

  const actionAccess = useOfferAccess();

  const handleEditClose = useCallback(() => setOfferToEdit(null), []);
  const handleDeleteClose = useCallback(() => setOfferToDelete(null), []);

  const renderRow = useCallback(
    (offer: Offer) => (
      <OfferRow
        key={offer.id}
        offer={offer}
        actionAccess={actionAccess}
        onDelete={setOfferToDelete}
        onEdit={setOfferToEdit}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {actionAccess.canUpdate && (
        <EditOffer offer={offerToEdit} onClose={handleEditClose} />
      )}

      {actionAccess.canDelete && (
        <DeleteOfferModal offer={offerToDelete} onClose={handleDeleteClose} />
      )}

      <EntityListTable
        data={data}
        title={t('all')}
        toolbar={actionAccess.canCreate ? <AddOfferButton /> : undefined}
        basePath="/dashboard/offers"
        columns={
          <>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('requiredAmount')}</TableHead>
            <TableHead>{t('benefit')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </>
        }
        renderRow={renderRow}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
