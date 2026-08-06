import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { usePermissionsCatalogSuspense } from '@/entities/permission';
import {
  useGetRoleSuspense,
  useEditRole,
  type RoleFormData,
  type RoleItem,
} from '@/entities/role';
import { RoleForm } from '@/features/role-form';
import { PageTitle, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { ProtectedRoleEditFallback } from './ProtectedRoleEditFallback';

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

type RoleEditPageContentProps = {
  roleId: number;
};

function RoleEditPageContent({ roleId }: RoleEditPageContentProps) {
  const { data: role } = useGetRoleSuspense(roleId);
  const { t } = useTranslation('roles');

  const roleName = t(`roleLabels.${role.name}`, role.name);
  const pageTitle = `${roleName} · ${t('edit.title')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      {role.is_editable ? (
        <EditableRoleContent role={role} />
      ) : (
        <ProtectedRoleEditFallback roleId={role.id} />
      )}
    </>
  );
}

type EditableRoleContentProps = {
  role: RoleItem;
};

function EditableRoleContent({ role }: EditableRoleContentProps) {
  const { data: catalog } = usePermissionsCatalogSuspense();
  const { mutate: editRole, isPending } = useEditRole(role.id);
  const navigate = useNavigate();
  const { t } = useTranslation('roles', { keyPrefix: 'edit' });

  const handleSubmit = useCallback(
    (values: RoleFormData) => {
      editRole({ id: role.id, ...values });
    },
    [editRole, role.id],
  );

  const handleReset = useCallback(() => {
    navigate(`/dashboard/roles/${role.id}`);
  }, [navigate, role.id]);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

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
