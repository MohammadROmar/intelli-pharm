import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { TargetAchievementTable } from './TargetAchievementTable';
import { useGetTargetAchievementsSuspense } from '../model/useGetTargetAchievementsSuspense';
import { PageTitle, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function TargetAchievementListPage() {
  const { id: rawId } = useParams<{ id: string }>();
  const numericId = Number(rawId);

  if (!rawId || Number.isNaN(numericId)) {
    return <QueryDisabled path="/dashboard/targets" />;
  }

  return (
    <QueryErrorBoundary>
      <TargetAchievementListContent targetId={numericId} />
    </QueryErrorBoundary>
  );
}

type Props = { targetId: number };

function TargetAchievementListContent({ targetId }: Props) {
  const { t } = useTranslation('targets', { keyPrefix: 'achievements' });
  const { data } = useGetTargetAchievementsSuspense(targetId);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <TargetAchievementTable targetId={targetId} data={data.data!} />
    </>
  );
}
