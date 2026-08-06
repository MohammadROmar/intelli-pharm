import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteGiftModal } from '@/features/gift-delete';
import type { Gift } from '@/entities/gift';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
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
  const grantedPermissions = useGrantedPermissions();

  const canUpdate = hasPermission(grantedPermissions, 'erp.gifts.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.gifts.delete');
  const hasAnyAction = canUpdate || canDelete;

  return (
    <>
      {canDelete ? (
        <DeleteGiftModal
          gift={giftToDelete}
          onClose={() => setGiftToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/promotions/gifts')}
        />
      ) : null}

      {canUpdate ? (
        <EditGiftForm gift={giftToEdit} onClose={() => setGiftToEdit(null)} />
      ) : null}

      {hasAnyAction ? (
        <ActionsDropdown label={t('actions')}>
          {canUpdate ? (
            <DropdownMenuItem onSelect={() => setGiftToEdit(gift)}>
              <Pencil className="size-4" />
              {t('edit')}
            </DropdownMenuItem>
          ) : null}

          {canDelete ? (
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setGiftToDelete(gift)}
              className="text-destructive hover:text-destructive hover:bg-destructive/20 w-full justify-start"
            >
              <Trash2 className="size-4" />
              {t('delete')}
            </DropdownMenuItem>
          ) : null}
        </ActionsDropdown>
      ) : null}
    </>
  );
}
