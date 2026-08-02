import { useTranslation } from 'react-i18next';

import { RolesTable } from './RolesTable';
import { useGetRolesSuspense } from '../model/useGetRolesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function RoleListPage() {
  return (
    <QueryErrorBoundary>
      <RoleListContent />
    </QueryErrorBoundary>
  );
}

function RoleListContent() {
  const { t } = useTranslation('roles', { keyPrefix: 'list' });
  const { data } = useGetRolesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <RolesTable data={data!.data!} />
    </>
  );
}
