import { useParams } from 'react-router';

import { QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

import { OrderItems } from './OrderItems';
import { Confirmations } from './Confirmations';
import { RelatedRecords } from './RelatedRecords';
import { FinancialSummary } from './FinancialSummary';
import { DeliveryOrderCard } from './DeliveryOrderCard';
import { DeliveryInformation } from './DeliveryInformation';
import { DeliveryDetailHeader } from './DeliveryDetailHeader';
import { DeliverySummaryStrip } from './DeliverySummaryStrip';
import { useGetDeliverySuspense } from '../model/useGetDeliverySuspense';
import { useDeliveryDetailAccess } from '../model/useDeliveryDetailAccess';

export default function DeliveryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deliveryId = Number(id);

  if (!id || Number.isNaN(deliveryId)) {
    return <QueryDisabled path="/dashboard/deliveries" />;
  }

  return (
    <QueryErrorBoundary>
      <DeliveryDetailContent deliveryId={deliveryId} />
    </QueryErrorBoundary>
  );
}

type DeliveryDetailContentProps = { deliveryId: number };

function DeliveryDetailContent({ deliveryId }: DeliveryDetailContentProps) {
  const { data } = useGetDeliverySuspense(deliveryId);

  const actionAccess = useDeliveryDetailAccess();

  const delivery = data.data!;

  return (
    <div className="space-y-5 pb-8">
      <DeliveryDetailHeader
        delivery={delivery}
        canUpdate={actionAccess.canChangeStatus}
      />
      <DeliverySummaryStrip delivery={delivery} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
        <aside className="space-y-5 xl:col-start-2 xl:row-start-1">
          <Confirmations confirmations={delivery.confirmations} />
          <FinancialSummary delivery={delivery} />
          <DeliveryOrderCard
            order={delivery.order}
            actionAccess={actionAccess}
          />
          <RelatedRecords delivery={delivery} actionAccess={actionAccess} />
        </aside>

        <main className="min-w-0 space-y-5 xl:col-start-1 xl:row-start-1">
          <OrderItems delivery={delivery} actionAccess={actionAccess} />
          <DeliveryInformation delivery={delivery} />
        </main>
      </div>
    </div>
  );
}
