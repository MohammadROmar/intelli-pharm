import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { PharmacyEditForm } from '@/features/pharmacy-edit';
import { useGetPharmacySuspense } from '@/entities/pharmacy';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function PharmacyEditPage() {
  const { id } = useParams<{ id: string }>();
  const pharmacyId = Number(id);

  if (!id || Number.isNaN(pharmacyId)) {
    return <QueryDisabled isEdit path="/dashboard/pharmacies" />;
  }

  return (
    <QueryErrorBoundary>
      <PharmacyEditPageContent pharmacyId={pharmacyId} />
    </QueryErrorBoundary>
  );
}

type PharmacyEditPageContentProps = { pharmacyId: number };

function PharmacyEditPageContent({ pharmacyId }: PharmacyEditPageContentProps) {
  const { t } = useTranslation('pharmacies', {
    keyPrefix: 'edit',
  });

  const { data } = useGetPharmacySuspense(pharmacyId);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PharmacyEditForm pharmacy={data.data!} />
    </>
  );
}
