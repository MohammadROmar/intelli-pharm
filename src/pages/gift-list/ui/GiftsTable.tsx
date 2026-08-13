import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditGiftForm } from '@/features/gift-edit';
import { useGiftAccess } from '@/features/gift-access';
import { CreateGiftForm } from '@/features/gift-create';
import { DeleteGiftModal } from '@/features/gift-delete';
import type { Gift, GiftResponse } from '@/entities/gift';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { GiftRow } from './GiftRow';

type Props = { data: GiftResponse };

export function GiftsTable({ data }: Props) {
  const { t } = useTranslation('gifts');

  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const actionAccess = useGiftAccess();

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
      {actionAccess.canDelete && (
        <DeleteGiftModal gift={giftToDelete} onClose={handleDeleteModalClose} />
      )}

      {actionAccess.canUpdate && (
        <EditGiftForm gift={giftToEdit} onClose={handleEditModalClose} />
      )}

      <EntityListTable
        data={tableData}
        title={t('list.all')}
        toolbar={actionAccess.canCreate ? <CreateGiftForm /> : undefined}
        basePath="/dashboard/promotions/gifts"
        columns={
          <>
            <TableHead>{t('list.medicineName')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.requiredQuantity')}</TableHead>
            <TableHead>{t('list.giftQuantity')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={renderRow}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
