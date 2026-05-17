import { useTranslation } from 'react-i18next';

import { LaboratoryTable } from './LaboratoryTable';
import { useGetLaboratoriesSuspense } from '../model/useGetLaboratoriesSuspense';
import { QueryErrorBoundary, PageTitle } from '@/shared/ui';

export default function LaboratoryListPage() {
  return (
    <QueryErrorBoundary>
      <LaboratoryListContent />
    </QueryErrorBoundary>
  );
}

function LaboratoryListContent() {
  const { t } = useTranslation('laboratories');
  const { data } = useGetLaboratoriesSuspense();

  return (
    <>
      <PageTitle title={t('list.title')} subtitle={t('list.subtitle')} />
      <LaboratoryTable data={data.data!} />
    </>
  );
}
