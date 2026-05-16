import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { RegionEditForm } from '@/features/region-edit';
import { useGetRegionSuspense } from '@/entities/region';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function RegionEditPage() {
  const { id } = useParams<{ id: string }>();
  const regionId = Number(id);

  if (!id || Number.isNaN(regionId)) {
    return <QueryDisabled isEdit path="/dashboard/regions" />;
  }

  return (
    <QueryErrorBoundary>
      <RegionEditPageContent regionId={regionId} />
    </QueryErrorBoundary>
  );
}

type RegionEditPageContentProps = { regionId: number };

function RegionEditPageContent({ regionId }: RegionEditPageContentProps) {
  const { t } = useTranslation('regions');

  const { data } = useGetRegionSuspense(regionId);

  return (
    <>
      <PageTitle title={t('edit.title')} subtitle={t('edit.subtitle')} />
      <RegionEditForm region={data.data!} />
    </>
  );
}
