import { ORDERS_TREND_DAYS } from '../model/constants';
import { useOrdersTrend } from '../model/queries';

import { OrdersTrendChart } from './OrdersTrendChart';

type OrdersTrendSectionProps = {
  days?: number;
};

export function OrdersTrendSection({
  days = ORDERS_TREND_DAYS,
}: OrdersTrendSectionProps) {
  const { data: response } = useOrdersTrend(days);

  return <OrdersTrendChart trend={response.data!} days={days} />;
}
