import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useHasPermission } from '@/entities/session';
import { PageTitle, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { TargetAchievementTable } from './TargetAchievementTable';
import { useGetTargetAchievementsSuspense } from '../model/useGetTargetAchievementsSuspense';

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

  const canViewEmployee = useHasPermission('erp.employees.view');

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <TargetAchievementTable
        targetId={targetId}
        data={data.data!}
        canViewEmployee={canViewEmployee}
      />
    </>
  );
}
