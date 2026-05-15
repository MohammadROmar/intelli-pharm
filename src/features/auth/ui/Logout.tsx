import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';

import { logout } from '@/entities/session';
import { useAppDispatch } from '@/shared/config';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui';

export function LogoutButton() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation('common', { keyPrefix: 'logout' });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-fit! w-full items-center justify-start gap-2 px-2! py-1.5!"
        >
          <LogOut />
          {t('title')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t('cancel')}</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => dispatch(logout())}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
