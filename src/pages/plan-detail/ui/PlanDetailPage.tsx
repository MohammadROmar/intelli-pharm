import { useParams } from 'react-router-dom';

import { PlanDetail } from './PlanDetail';
import { useGetPlan } from '../model/useGetPlan';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function PlanDetailPage() {
  const { id } = useParams<{ id: string }>();
  const planId = Number(id);

  if (!id || Number.isNaN(planId)) {
    return <QueryDisabled path="/dashboard/plans" />;
  }

  return (
    <QueryErrorBoundary>
      <PlanDetailContent planId={planId} />
    </QueryErrorBoundary>
  );
}

type PlanDetailContentProps = { planId: number };

function PlanDetailContent({ planId }: PlanDetailContentProps) {
  const { data } = useGetPlan(planId);

  const plan = data.data!;

  return <PlanDetail plan={plan} />;
}
