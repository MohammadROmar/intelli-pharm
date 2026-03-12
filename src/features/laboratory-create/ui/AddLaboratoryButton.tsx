import { useTranslation } from 'react-i18next';
import { CirclePlus } from 'lucide-react';

import { CreateLaboratoryForm } from './CreateLaboratoryForm';
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';

export function AddLaboratoryButton() {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage.create',
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label={t('addLab')}
          className="flex items-center justify-center gap-2"
        >
          <CirclePlus />
          <span aria-hidden className="hidden md:block">
            {t('addLab')}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>{t('subtitle')}</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 gap-6 p-4 pt-0">
          <CreateLaboratoryForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
