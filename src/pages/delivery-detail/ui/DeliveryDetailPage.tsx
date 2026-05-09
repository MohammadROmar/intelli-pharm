import { OrderItems } from './OrderItems';
import { Confirmations } from './Confirmations';
import { RelatedRecords } from './RelatedRecords';
import { FinancialSummary } from './FinancialSummary';
import { DeliveryOrderCard } from './DeliveryOrderCard';
import { DeliveryInformation } from './DeliveryInformation';
import { DeliveryDetailHeader } from './DeliveryDetailHeader';
import { useGetDelivery } from '../model/useGetDelivery';
import {
  Separator,
  QueryError,
  QueryDisabled,
  DetailSkeleton,
} from '@/shared/ui';

export default function DeliveryDetailPage() {
  const { data, isLoading, isEnabled, isError, error, refetch } =
    useGetDelivery();

  if (!isEnabled) {
    return <QueryDisabled path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={1} />;
  }

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
