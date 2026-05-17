import { useTranslation } from 'react-i18next';

import { RegionsTable } from './RegionTable';
import { useGetRegionsSuspense } from '../model/useGetRegionsSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function RegionListPage() {
  return (
    <QueryErrorBoundary>
      <RegionListContent />
    </QueryErrorBoundary>
  );
}

function RegionListContent() {
  const { t } = useTranslation('regions', { keyPrefix: 'list' });
  const { data } = useGetRegionsSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <RegionsTable data={data!.data!} />
    </>
  );
}
