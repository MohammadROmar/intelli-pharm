import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteGiftModal } from '@/features/gift-delete';
import type { Gift } from '@/entities/gift';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';
import { EditGiftForm } from '@/features/gift-edit';

type Props = { gift: Gift };

export function GiftDetailHeader({ gift }: Props) {
  const { t } = useTranslation('gifts', { keyPrefix: 'detail' });

  const giftTitle = `GFT-${String(gift.id).padStart(6, '0')}`;

  return (
    <PageHeader
      title={giftTitle}
      pageTitle={`${giftTitle} · ${t('pageTitle')} - IntelliPharma`}
    >
      <GiftActions gift={gift} />
    </PageHeader>
  );
}

function GiftActions({ gift }: Props) {
  const { t } = useTranslation('gifts', { keyPrefix: 'detail' });

  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const [giftToEdit, setGiftToEdit] = useState<Gift | null>(null);

  const navigate = useNavigate();

  return (
    <>
      <DeleteGiftModal
        gift={giftToDelete}
        onClose={() => setGiftToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/promotions/gifts')}
      />

      <EditGiftForm gift={giftToEdit} onClose={() => setGiftToEdit(null)} />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem onClick={() => setGiftToEdit(gift)}>
          <Pencil className="size-4" />
          {t('edit')}
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setGiftToDelete(gift)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20 w-full justify-start"
        >
          <Trash2 className="size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
