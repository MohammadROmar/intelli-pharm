import { useTranslation } from 'react-i18next';

import { TargetAchievementTable } from './TargetAchievementTable';
import { useGetTargetAchievements } from '../model/useGetTargetAchievements';
import {
  PageTitle,
  QueryDisabled,
  QueryError,
  TableSkeleton,
} from '@/shared/ui';

export default function MedicineListPage() {
  const { t } = useTranslation('targets', {
    keyPrefix: 'achievements',
  });

  const { id, queryData } = useGetTargetAchievements();
  const { data, isLoading, error, isEnabled, isError, refetch } = queryData;

  if (!isEnabled) return <QueryDisabled path="/dashboard/targets" />;
  if (isError) return <QueryError error={error} onRetry={refetch} />;
  if (isLoading || !data) return <TableSkeleton />;

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <TargetAchievementTable targetId={id} data={data.data!} />
    </>
  );
}
