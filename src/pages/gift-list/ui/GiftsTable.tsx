import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateGiftForm } from '@/features/gift-create';
import { DeleteGiftModal } from '@/features/gift-delete';
import { GiftRow } from '@/entities/gift';
import type { Gift, GiftResponse } from '@/entities/gift';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
} from '@/shared/ui';
import { EditGiftForm } from '@/features/gift-edit';

type Props = { data: GiftResponse };

export function GiftsTable({ data }: Props) {
  const { t } = useTranslation('gifts');

  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const gifts = data.data;

  return (
    <>
      <DeleteGiftModal
        gift={giftToDelete}
        onClose={() => setGiftToDelete(null)}
      />

      <EditGiftForm gift={giftToEdit} onClose={() => setGiftToEdit(null)} />

      <TableCard
        title={t('list.all')}
        currItemsCount={gifts.length}
        toolbar={<CreateGiftForm />}
        basePath="/dashboard/promotions/gifts"
        currentPage={data.current_page}
        totalItems={data.total}
        itemsPerPage={data.per_page}
      >
        {gifts.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('list.id')}</TableHead>
                <TableHead>{t('list.medicineName')}</TableHead>
                <TableHead>{t('list.status')}</TableHead>
                <TableHead>{t('list.requiredQuantity')}</TableHead>
                <TableHead>{t('list.giftQuantity')}</TableHead>
                <TableHead>{t('list.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gifts.map((gift) => (
                <GiftRow
                  key={gift.id}
                  gift={gift}
                  onDelete={setGiftToDelete}
                  onEdit={setGiftToEdit}
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
