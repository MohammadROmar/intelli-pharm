import { useParams } from 'react-router';

import { OrderItems } from './OrderItems';
import { Confirmations } from './Confirmations';
import { RelatedRecords } from './RelatedRecords';
import { FinancialSummary } from './FinancialSummary';
import { DeliveryOrderCard } from './DeliveryOrderCard';
import { DeliveryInformation } from './DeliveryInformation';
import { DeliveryDetailHeader } from './DeliveryDetailHeader';
import { useGetDeliverySuspense } from '../model/useGetDeliverySuspense';
import { Separator, QueryDisabled, QueryErrorBoundary } from '@/shared/ui';

export default function DeliveryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const deliveryId = Number(id);

  if (!id || Number.isNaN(deliveryId)) {
    return <QueryDisabled path="/dashboard/categories" />;
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

  const delivery = data.data!;

  return (
    <>
      <div className="space-y-6">
        <DeliveryDetailHeader delivery={delivery} />

        <Separator />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DeliveryInformation delivery={delivery} />
            <OrderItems delivery={delivery} />
            <Confirmations confirmations={delivery.confirmations} />
          </div>

          <div className="space-y-6">
            <FinancialSummary delivery={delivery} />
            <DeliveryOrderCard order={delivery.order} />
            <RelatedRecords delivery={delivery} />
          </div>
        </div>
      </div>
    </>
  );
}
