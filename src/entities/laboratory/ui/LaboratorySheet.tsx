import type { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FlaskConical, Plus } from 'lucide-react';

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

type Props = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  hasTrigger?: boolean;
  isEdit?: boolean;
  trigger?: ReactNode;
} & PropsWithChildren;

export function LaboratorySheetTrigger({ isEdit }: { isEdit?: boolean }) {
  const { t } = useTranslation('laboratories', {
    keyPrefix: `${isEdit ? 'edit' : 'create'}`,
  });

  return (
    <SheetTrigger asChild>
      <Button size="sm" className="flex items-center justify-center gap-2">
        <Plus className="size-4" />
        <span>{t('action')}</span>
      </Button>
    </SheetTrigger>
  );
}

export function LaboratorySheet({
  open,
  onOpenChange,
  isEdit = false,
  hasTrigger = false,
  trigger,
  children,
}: Props) {
  const { t, i18n } = useTranslation('laboratories', {
    keyPrefix: `${isEdit ? 'edit' : 'create'}`,
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {hasTrigger && <LaboratorySheetTrigger />}
      {!hasTrigger && trigger}

      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle')}
            icon={FlaskConical}
            aria-hidden
          />
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
