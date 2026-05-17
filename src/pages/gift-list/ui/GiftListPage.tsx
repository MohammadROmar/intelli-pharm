import { useTranslation } from 'react-i18next';

import { GiftsTable } from './GiftsTable';
import { useGetGiftsSuspense } from '../model/useGetGiftsSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function GiftListPage() {
  return (
    <QueryErrorBoundary>
      <GiftListContent />
    </QueryErrorBoundary>
  );
}

function GiftListContent() {
  const { t } = useTranslation('gifts', { keyPrefix: 'list' });
  const { data } = useGetGiftsSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <GiftsTable data={data!.data!} />
    </>
  );
}
