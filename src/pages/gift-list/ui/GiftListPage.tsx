import { useTranslation } from 'react-i18next';

import { GiftsTable } from './GiftsTable';
import { useGetGifts } from '../model/useGetGifts';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function GiftListPage() {
  const { t } = useTranslation('gifts', { keyPrefix: 'list' });

  const { data, isLoading, error, isError, refetch } = useGetGifts();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <GiftsTable data={data.data!} />
    </>
  );
}
