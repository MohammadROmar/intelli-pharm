import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateGiftForm } from '@/features/gift-create';
import { DeleteGiftModal } from '@/features/gift-delete';
import { GiftRow } from '@/entities/gift';
import type { Gift, GiftResponse } from '@/entities/gift';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';
import { EditGiftForm } from '@/features/gift-edit';

type Props = { data: GiftResponse };

export function GiftsTable({ data }: Props) {
  const { t } = useTranslation('gifts');

  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const gifts = data.data;
  const tableData = {
    data: gifts,
    meta: {
      current_page: data.current_page,
      total: data.total,
      per_page: data.per_page,
    },
  };

  return (
    <>
      <DeleteGiftModal
        gift={giftToDelete}
        onClose={() => setGiftToDelete(null)}
      />

      <EditGiftForm gift={giftToEdit} onClose={() => setGiftToEdit(null)} />

      <EntityListTable
        data={tableData}
        title={t('list.all')}
        toolbar={<CreateGiftForm />}
        basePath="/dashboard/promotions/gifts"
        addHref={undefined}
        addLabel={undefined}
        columns={
          <>
            <TableHead className="w-25">{t('list.id')}</TableHead>
            <TableHead>{t('list.medicineName')}</TableHead>
            <TableHead>{t('list.status')}</TableHead>
            <TableHead>{t('list.requiredQuantity')}</TableHead>
            <TableHead>{t('list.giftQuantity')}</TableHead>
            <TableHead>{t('list.actions')}</TableHead>
          </>
        }
        renderRow={(gift) => (
          <GiftRow
            key={gift.id}
            gift={gift}
            onDelete={setGiftToDelete}
            onEdit={setGiftToEdit}
          />
        )}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
