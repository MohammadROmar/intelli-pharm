import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { FlaskConical } from 'lucide-react';

import {
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui';

type Props = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  isEdit?: boolean;
} & PropsWithChildren;

export function LaboratorySheet({
  open,
  onOpenChange,
  isEdit = false,
  children,
}: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: `laboratoriesPage.${isEdit ? 'edit' : 'create'}`,
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('subtitle')}
              icon={FlaskConical}
            />
          </div>
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
