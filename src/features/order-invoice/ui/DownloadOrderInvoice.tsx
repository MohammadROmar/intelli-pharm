import { useTranslation } from 'react-i18next';
import { FileDown } from 'lucide-react';
import { toast } from 'sonner';

import { downloadOrderInvoice } from '@/entities/order';
import { DropdownMenuItem } from '@/shared/ui';

type Props = {
  orderId: number;
  orderCode: string;
};

export function DownloadOrderInvoice({ orderId, orderCode }: Props) {
  const { t } = useTranslation('order-detail', { keyPrefix: 'detail.header' });

  async function handleDownload() {
    const toastId = toast.loading(t('downloadingInvoice'));

    try {
      const invoice = await downloadOrderInvoice(orderId);
      const objectUrl = URL.createObjectURL(invoice);

      const link = document.createElement('a');

      link.href = objectUrl;
      link.download = `invoice-${orderCode}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1_000);

      toast.success(t('invoiceDownloadSuccess'), {
        id: toastId,
      });
    } catch {
      toast.error(t('invoiceDownloadError'), {
        id: toastId,
      });
    }
  }

  return (
    <DropdownMenuItem
      onSelect={() => void handleDownload()}
      className="cursor-pointer"
    >
      <FileDown className="size-4" aria-hidden="true" />
      {t('downloadInvoice')}
    </DropdownMenuItem>
  );
}
