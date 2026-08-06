import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditOffer } from '@/features/offer-edit';
import { DeleteOfferModal } from '@/features/offer-delete';
import { AddOfferButton } from '@/entities/offer';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { Offer, OfferResponse } from '@/entities/offer';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { OfferRow, type OfferRowActionAccess } from './OfferRow';

type Props = { data: OfferResponse };

export function OffersTable({ data }: Props) {
  const { t } = useTranslation('offers', { keyPrefix: 'list' });
  const grantedPermissions = useGrantedPermissions();

  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  const canCreate = hasPermission(grantedPermissions, 'erp.offers.create');
  const canView = hasPermission(grantedPermissions, 'erp.offers.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.offers.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.offers.delete');

  const actionAccess = useMemo<OfferRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

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
      {canUpdate ? (
        <EditOffer offer={offerToEdit} onClose={handleEditClose} />
      ) : null}

      {canDelete ? (
        <DeleteOfferModal offer={offerToDelete} onClose={handleDeleteClose} />
      ) : null}

      <EntityListTable
        data={data}
        title={t('all')}
        toolbar={canCreate ? <AddOfferButton /> : undefined}
        basePath="/dashboard/offers"
        columns={
          <>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('requiredAmount')}</TableHead>
            <TableHead>{t('benefit')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('actions')}</TableHead>
            ) : null}
          </>
        }
        renderRow={renderRow}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
