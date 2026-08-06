import { useParams } from 'react-router';

import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

import { PlanDetail } from './PlanDetail';
import { useGetPlan } from '../model/useGetPlan';
import { usePlanDetailAccess } from '../model/usePlanDetailAccess';

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

  const { canViewEmployee, canViewPharmacy, canViewRegion } =
    usePlanDetailAccess();

  const plan = data.data!;

  return (
    <PlanDetail
      plan={plan}
      canViewEmployee={canViewEmployee}
      canViewRegion={canViewRegion}
      canViewPharmacy={canViewPharmacy}
    />
  );
}
