import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { downloadOrderInvoice } from '@/entities/order';

const FRAME_LOAD_TIMEOUT_MS = 30_000;
const OBJECT_URL_FALLBACK_TIMEOUT_MS = 5 * 60 * 1_000;

function waitForFrameLoad(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('Invoice preview timed out.'));
    }, FRAME_LOAD_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeoutId);
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    }

    function handleLoad() {
      cleanup();
      resolve();
    }

    function handleError() {
      cleanup();
      reject(new Error('Invoice preview failed to load.'));
    }

    iframe.addEventListener('load', handleLoad, { once: true });
    iframe.addEventListener('error', handleError, { once: true });
  });
}

function scheduleObjectUrlRevocation(
  invoiceUrl: string,
  frameWindow: Window,
): () => void {
  let revoked = false;

  function revoke() {
    if (revoked) return;

    revoked = true;

    window.clearTimeout(timeoutId);

    frameWindow.removeEventListener('afterprint', revoke);
    URL.revokeObjectURL(invoiceUrl);
  }

  const timeoutId = window.setTimeout(revoke, OBJECT_URL_FALLBACK_TIMEOUT_MS);

  frameWindow.addEventListener('afterprint', revoke, { once: true });

  return revoke;
}

export function usePrintOrderInvoice(orderId: number) {
  const { t, i18n } = useTranslation('order-detail', {
    keyPrefix: 'detail.header',
  });

  const isPreparingRef = useRef(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const printInvoice = useCallback(async () => {
    if (isPreparingRef.current) return;

    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      toast.error(t('printWindowBlocked'));
      return;
    }

    printWindow.opener = null;

    isPreparingRef.current = true;
    setIsPreparing(true);

    const toastId = toast.loading(t('preparingInvoice'));
    let invoiceUrl: string | null = null;

    try {
      const printDocument = printWindow.document;

      printDocument.title = t('printInvoice');
      printDocument.documentElement.lang =
        i18n.resolvedLanguage ?? i18n.language;
      printDocument.documentElement.dir = i18n.dir();

      const loadingText = printDocument.createElement('p');

      loadingText.textContent = t('preparingInvoice');
      loadingText.setAttribute('role', 'status');

      printDocument.body.replaceChildren(loadingText);

      const invoice = await downloadOrderInvoice(orderId);

      if (printWindow.closed) {
        toast.dismiss(toastId);
        return;
      }

      invoiceUrl = URL.createObjectURL(invoice);

      const iframe = printDocument.createElement('iframe');

      iframe.title = t('printInvoice');
      iframe.style.cssText =
        'position:fixed;inset:0;width:100%;height:100%;border:0;';

      printDocument.body.replaceChildren(iframe);

      const frameLoaded = waitForFrameLoad(iframe);

      iframe.src = invoiceUrl;

      await frameLoaded;

      if (printWindow.closed) {
        toast.dismiss(toastId);
        return;
      }

      const frameWindow = iframe.contentWindow;

      if (!frameWindow) {
        throw new Error('Invoice frame is unavailable.');
      }

      const revokeObjectUrl = scheduleObjectUrlRevocation(
        invoiceUrl,
        frameWindow,
      );

      try {
        frameWindow.focus();
        frameWindow.print();

        toast.dismiss(toastId);
        invoiceUrl = null;
      } catch (error) {
        revokeObjectUrl();
        invoiceUrl = null;

        throw error;
      }
    } catch {
      if (!printWindow.closed) {
        printWindow.close();
      }

      toast.error(t('invoicePrintError'), {
        id: toastId,
      });
    } finally {
      if (invoiceUrl) {
        URL.revokeObjectURL(invoiceUrl);
      }

      isPreparingRef.current = false;
      setIsPreparing(false);
    }
  }, [i18n, orderId, t]);

  return {
    printInvoice,
    isPreparing,
  };
}
