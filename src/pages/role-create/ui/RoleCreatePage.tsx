import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { PageTitle, QueryErrorBoundary } from '@/shared/ui';
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
  const { mutate: createRole, isPending } = useCreateRole();
  const navigate = useNavigate();

  const handleReset = useCallback(() => navigate(-1), [navigate]);

  return (
    <RoleForm
      isPending={isPending}
      onSubmit={createRole}
      onReset={handleReset}
    />
  );
}
