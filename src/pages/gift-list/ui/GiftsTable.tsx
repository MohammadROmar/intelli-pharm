import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditGiftForm } from '@/features/gift-edit';
import { CreateGiftForm } from '@/features/gift-create';
import { DeleteGiftModal } from '@/features/gift-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { Gift, GiftResponse } from '@/entities/gift';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { GiftRow, type GiftRowActionAccess } from './GiftRow';

type Props = { data: GiftResponse };

export function GiftsTable({ data }: Props) {
  const { t } = useTranslation('gifts');
  const grantedPermissions = useGrantedPermissions();

  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const canCreate = hasPermission(grantedPermissions, 'erp.gifts.create');
  const canView = hasPermission(grantedPermissions, 'erp.gifts.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.gifts.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.gifts.delete');

  const actionAccess = useMemo<GiftRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

  const handleDeleteModalClose = useCallback(() => {
    setGiftToDelete(null);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setGiftToEdit(null);
  }, []);

  const gifts = data.data;
  const tableData = {
    data: gifts,
    meta: {
      current_page: data.current_page,
      total: data.total,
      per_page: data.per_page,
    },
  };

  const renderRow = useCallback(
    (gift: Gift) => (
      <GiftRow
        key={gift.id}
        gift={gift}
        actionAccess={actionAccess}
        onDelete={setGiftToDelete}
        onEdit={setGiftToEdit}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {canDelete ? (
        <DeleteGiftModal gift={giftToDelete} onClose={handleDeleteModalClose} />
      ) : null}

      {canUpdate ? (
        <EditGiftForm gift={giftToEdit} onClose={handleEditModalClose} />
      ) : null}

      <EntityListTable
        data={tableData}
        title={t('list.all')}
        toolbar={canCreate ? <CreateGiftForm /> : undefined}
        basePath="/dashboard/promotions/gifts"
        columns={
          <>
            <TableHead>{t('list.medicineName')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.requiredQuantity')}</TableHead>
            <TableHead>{t('list.giftQuantity')}</TableHead>
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('list.actions')}</TableHead>
            ) : null}
          </>
        }
        renderRow={renderRow}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
