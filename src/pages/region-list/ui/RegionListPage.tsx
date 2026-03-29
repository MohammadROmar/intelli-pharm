import { useTranslation } from 'react-i18next';

import { RegionsTable } from './RegionTable';
import { useGetRegions } from '../model/useGetRegions';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function RegionListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.list',
  });

  const { data: regions, isError, error, isLoading, refetch } = useGetRegions();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !regions) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <RegionsTable data={regions.data!} />
    </>
  );
}
