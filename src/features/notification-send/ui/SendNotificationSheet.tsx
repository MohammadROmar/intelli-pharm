import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

import {
  Button,
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';

import { SendNotificationForm } from './SendNotificationForm';

export function SendNotificationSheet() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation('send-notification');

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" size="sm">
          <Bell className="size-4" />
          {t('trigger')}
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="flex flex-col gap-6 sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('description')}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={t('description')}
            icon={Bell}
            aria-hidden
          />
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">
          {open && <SendNotificationForm onSuccess={() => setOpen(false)} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
