import { useTranslation } from 'react-i18next';

import { PlansTable } from './PlansTable';
import { useGetPlans } from '../model/useGetPlans';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function PlanListPage() {
  return (
    <QueryErrorBoundary>
      <PlanListContent />
    </QueryErrorBoundary>
  );
}

function PlanListContent() {
  const { t } = useTranslation('plan', { keyPrefix: 'list' });
  const { data } = useGetPlans();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PlansTable data={data!.data!} />
    </>
  );
}
