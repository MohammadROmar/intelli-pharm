import { useTranslation } from 'react-i18next';

import { MedicinesTable } from './MedicinesTable';
import { useGetMedicines } from '../model/useGetMedicines';
import { PageTitle, QueryError, TableSkeleton } from '@/shared/ui';

export default function MedicineListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.list',
  });

  const { data, isLoading, error, isError, refetch } = useGetMedicines();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicinesTable data={data.data!} />
    </>
  );
}
