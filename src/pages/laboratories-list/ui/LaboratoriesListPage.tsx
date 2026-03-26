import { useTranslation } from 'react-i18next';

import { LaboratoriesTable } from './LaboratoriesList';
import { useGetLaboratories } from '../model/useGetLaboratories';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function LaboratoriesPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'laboratoriesPage',
  });

  const { data, isLoading, isError, error } = useGetLaboratories();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('list.title')} subtitle={t('list.subtitle')} />

      <LaboratoriesTable data={data.data!} />
    </>
  );
}
