import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { PageTitle, QueryErrorBoundary } from '@/shared/ui';
import { usePermissionsCatalogSuspense } from '@/entities/permission';
import { useCreateRole } from '@/entities/role';
import { RoleForm } from '@/features/role-form';

export default function RoleCreatePage() {
  const { t } = useTranslation('roles', { keyPrefix: 'create' });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <QueryErrorBoundary>
        <RoleCreatePageContent />
      </QueryErrorBoundary>
    </>
  );
}

function RoleCreatePageContent() {
  const { data: catalog } = usePermissionsCatalogSuspense();
  const { mutate: createRole, isPending } = useCreateRole();
  const navigate = useNavigate();

  const handleReset = useCallback(() => navigate(-1), [navigate]);

  return (
    <RoleForm
      catalog={catalog}
      isPending={isPending}
      onSubmit={createRole}
      onReset={handleReset}
    />
  );
}
