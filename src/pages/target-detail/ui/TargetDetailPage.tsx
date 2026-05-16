import { useParams } from 'react-router-dom';

import { TargetInfoCard } from './TargetInfoCard';
import { TargetDetailHeader } from './TargetPageHeader';
import { useGetTargetSuspense } from '../model/useGetTargetSuspense';
import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function TargetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const targetId = Number(id);

  if (!id || Number.isNaN(targetId)) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  return (
    <QueryErrorBoundary>
      <TargetDetailContent targetId={targetId} />
    </QueryErrorBoundary>
  );
}

type TargetDetailContentProps = { targetId: number };

function TargetDetailContent({ targetId }: TargetDetailContentProps) {
  const { data } = useGetTargetSuspense(targetId);

  const target = data.data!;

  return (
    <div className="space-y-6">
      <TargetDetailHeader target={target} />
      <TargetInfoCard target={target} />
    </div>
  );
}
