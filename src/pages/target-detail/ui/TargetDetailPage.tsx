import { TargetInfoCard } from './TargetInfoCard';
import { TargetDetailHeader } from './TargetPageHeader';
import { useGetTarget } from '../model/useGetTarget';
import { QueryError, QueryDisabled, DetailSkeleton } from '@/shared/ui';

export default function TargetDetailPage() {
  const { isLoading, data, isEnabled, isError, error, refetch } =
    useGetTarget();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/medicines" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={0} />;
  }

  const target = data.data!;

  return (
    <div className="space-y-6">
      <TargetDetailHeader target={target} />
      <TargetInfoCard target={target} />
    </div>
  );
}
