import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

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

import { useLogout } from '../model/useLogout';

export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const { t } = useTranslation('common', { keyPrefix: 'logout' });

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async ({ isError }) => {
      if (isError) {
        const { toast } = await import('sonner');
        toast.error(t('serverErrorTitle'), {
          description: t('serverErrorDescription'),
        });
        return;
      }

      setOpen(false);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (isPending && !nextOpen) return;
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive flex h-fit! w-full items-center justify-start gap-2 px-2! py-1.5!"
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
            <Button variant="outline" disabled={isPending}>
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
            className="disabled:button-shimmer disabled:[--skeleton-shine:color-mix(in_oklch,var(--destructive),white_45%)] disabled:[--skeleton:var(--destructive)]"
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
