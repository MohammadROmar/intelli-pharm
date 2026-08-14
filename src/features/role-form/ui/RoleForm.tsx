import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { usePermissionsCatalogSuspense } from '@/entities/permission';
import type { Role, RoleFormData } from '@/entities/role';
import { useHasPermission } from '@/entities/session';
import { FormActions, QueryErrorBoundary } from '@/shared/ui';

import { RoleBasicInfoCard } from './RoleBasicInfoCard';
import { RolePermissionsCard } from './RolePermissionsCard';
import { RolePermissionsAccessDenied } from './RolePermissionsAccessDenied';
import { getAvailablePermissions, roleToFormData } from '../lib/roleFormUtils';

type RoleFormProps = {
  role?: Role;
  isPending?: boolean;
  onSubmit: (values: RoleFormData) => void;
  onReset: () => void;
};

export function RoleForm({
  role,
  isPending,
  onSubmit,
  onReset,
}: RoleFormProps) {
  const canViewPermissions = useHasPermission('auth.permissions.view');

  if (!canViewPermissions) {
    return <RolePermissionsAccessDenied />;
  }

  return (
    <QueryErrorBoundary>
      <RoleFormContent
        role={role}
        isPending={isPending}
        onSubmit={onSubmit}
        onReset={onReset}
      />
    </QueryErrorBoundary>
  );
}

function RoleFormContent({
  role,
  isPending,
  onSubmit,
  onReset,
}: RoleFormProps) {
  const { t } = useTranslation('roles', { keyPrefix: 'form' });
  const { data: catalog } = usePermissionsCatalogSuspense();

  const availablePermissions = useMemo(
    () => getAvailablePermissions(catalog),
    [catalog],
  );

  const defaultValues = useMemo(
    () => roleToFormData(role, availablePermissions),
    [availablePermissions, role],
  );

  const methods = useForm<RoleFormData>({ defaultValues, mode: 'onTouched' });

  function submitHandler(values: RoleFormData) {
    onSubmit({ ...values, name: values.name.trim() });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="space-y-6"
      >
        <RoleBasicInfoCard isPending={isPending} />
        <RolePermissionsCard
          permissions={availablePermissions}
          isPending={isPending}
        />
        <FormActions
          isEdit={Boolean(role)}
          isLoading={isPending}
          resetLabel={t('cancel')}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
