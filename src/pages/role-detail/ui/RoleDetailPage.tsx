import { useParams } from 'react-router';

import { PermissionsCard } from '@/entities/permission';
import { useGetRoleSuspense } from '@/entities/role';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

import { RoleInfoGrid } from './RoleInfoGrid';
import { RoleDetailHeader } from './RoleDetailHeader';

export default function RoleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const roleId = Number(id);

  if (!id || Number.isNaN(roleId)) {
    return <QueryDisabled path="/dashboard/roles" />;
  }

  return (
    <QueryErrorBoundary>
      <RoleDetailContent roleId={roleId} />
    </QueryErrorBoundary>
  );
}

type RoleDetailContentProps = { roleId: number };

function RoleDetailContent({ roleId }: RoleDetailContentProps) {
  const { data: role } = useGetRoleSuspense(roleId);

  return (
    <div className="space-y-6">
      <RoleDetailHeader role={role} />
      <RoleInfoGrid role={role} />
      <PermissionsCard permissions={role.permissions} />
    </div>
  );
}
