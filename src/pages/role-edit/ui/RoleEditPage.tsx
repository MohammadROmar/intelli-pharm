import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { usePermissionsCatalogSuspense } from '@/entities/permission';
import {
  useGetRoleSuspense,
  useEditRole,
  type RoleFormData,
} from '@/entities/role';
import { RoleForm } from '@/features/role-form';
import { PageTitle, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

export default function RoleEditPage() {
  const { id } = useParams<{ id: string }>();
  const roleId = Number(id);

  if (!id || Number.isNaN(roleId)) {
    return <QueryDisabled path="/dashboard/roles" />;
  }

  return (
    <QueryErrorBoundary>
      <RoleEditPageContent roleId={roleId} />
    </QueryErrorBoundary>
  );
}

type RoleEditPageContentProps = { roleId: number };

function RoleEditPageContent({ roleId }: RoleEditPageContentProps) {
  const { data: role } = useGetRoleSuspense(roleId);
  const { data: catalog } = usePermissionsCatalogSuspense();
  const { mutate: editRole, isPending } = useEditRole(roleId);
  const navigate = useNavigate();

  const { t } = useTranslation('roles', { keyPrefix: 'edit' });

  const handleSubmit = useCallback(
    (values: RoleFormData) => {
      editRole({ id: role.id, ...values });
    },
    [role.id, editRole],
  );

  const handleReset = useCallback(() => {
    navigate(`/dashboard/roles/${role.id}`);
  }, [navigate, role.id]);

  const pageTitle = `${role.name} · ${t('title')} - IntelliPharma`;

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <title>{pageTitle}</title>

      <RoleForm
        key={role.id}
        role={role}
        catalog={catalog}
        isPending={isPending}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </>
  );
}
