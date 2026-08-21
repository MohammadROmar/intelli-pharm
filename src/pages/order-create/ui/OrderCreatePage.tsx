import { useTranslation } from 'react-i18next';

import { OrderEditor } from '@/features/order-editor';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function OrderCreatePage() {
  return (
    <QueryErrorBoundary>
      <OrderCreateContent />
    </QueryErrorBoundary>
  );
}

function OrderCreateContent() {
  const { t } = useTranslation('order-form', { keyPrefix: 'create' });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <OrderEditor />
    </>
  );
}
