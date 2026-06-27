import { useParams } from 'react-router-dom';

import { PharmacyInfoCard } from './PharmacyInfoCard';
import { PharmacyScheduleCard } from './PharmacyScheduleCard';
import { PharmacyDetailHeader } from './PharmacyDetailHeader';
import { PharmacyLocationCard } from './PharmacyLocationCard';
import { PharmacyHistoryNotesCard } from './PharmacyHistoryNotesCard';
import { useGetPharmacySuspense } from '@/entities/pharmacy';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function PharmacyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pharmacyId = Number(id);

  if (!id || Number.isNaN(pharmacyId)) {
    return <QueryDisabled path="/dashboard/pharmacies" />;
  }

  return (
    <QueryErrorBoundary>
      <PharmacyDetailContent pharmacyId={pharmacyId} />
    </QueryErrorBoundary>
  );
}

type PharmacyDetailContentProps = { pharmacyId: number };

function PharmacyDetailContent({ pharmacyId }: PharmacyDetailContentProps) {
  const { data } = useGetPharmacySuspense(pharmacyId);

  const pharmacy = data.data!;

  return (
    <div className="space-y-6">
      <PharmacyDetailHeader pharmacy={pharmacy} />
      <PharmacyInfoCard pharmacy={pharmacy} />
      <PharmacyScheduleCard pharmacy={pharmacy} />
      <PharmacyHistoryNotesCard notes={pharmacy.history_notes} />
      <PharmacyLocationCard pharmacy={pharmacy} />
    </div>
  );
}
