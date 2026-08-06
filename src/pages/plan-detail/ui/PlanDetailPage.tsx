import { useParams } from 'react-router';

import { PlanDetail } from './PlanDetail';
import { useGetPlan } from '../model/useGetPlan';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
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
  const grantedPermissions = useGrantedPermissions();

  const canViewEmployee = hasPermission(
    grantedPermissions,
    'erp.employees.view',
  );
  const canViewRegion = hasPermission(grantedPermissions, 'erp.regions.view');
  const canViewPharmacy = hasPermission(
    grantedPermissions,
    'erp.pharmacies.view',
  );

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
