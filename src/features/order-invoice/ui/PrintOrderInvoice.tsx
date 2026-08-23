import { useTranslation } from 'react-i18next';
import { LoaderCircle, Printer } from 'lucide-react';

import { DropdownMenuItem } from '@/shared/ui';

import { usePrintOrderInvoice } from '../model/usePrintOrderInvoice';

type Props = {
  orderId: number;
};

export function PrintOrderInvoice({ orderId }: Props) {
  const { t } = useTranslation('order-detail', {
    keyPrefix: 'detail.header',
  });

  const { printInvoice, isPreparing } = usePrintOrderInvoice(orderId);

  return (
    <DropdownMenuItem
      disabled={isPreparing}
      onSelect={() => void printInvoice()}
      className="cursor-pointer"
    >
      {isPreparing ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Printer className="size-4" aria-hidden="true" />
      )}

      {t(isPreparing ? 'preparingInvoice' : 'printInvoice')}
    </DropdownMenuItem>
  );
}
