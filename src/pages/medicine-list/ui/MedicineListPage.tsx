import { useTranslation } from 'react-i18next';

import { MedicinesTable } from './MedicinesTable';
import { useGetMedicinesSuspense } from '../model/useGetMedicinesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function MedicineListPage() {
  return (
    <QueryErrorBoundary>
      <MedicineListContent />
    </QueryErrorBoundary>
  );
}

function MedicineListContent() {
  const { t } = useTranslation('medicines', { keyPrefix: 'list' });
  const { data } = useGetMedicinesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicinesTable data={data!.data!} />
    </>
  );
}
