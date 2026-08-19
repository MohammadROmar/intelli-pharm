type OrderPaymentFields = {
  final_total: string | number;
  paid_amount: string | number | null;
};

export function calculateRequiredPaymentAmount(
  order: OrderPaymentFields,
): number {
  const finalTotal = Number(order.final_total);
  const paidAmount = Number(order.paid_amount ?? 0);

  return finalTotal - paidAmount;
}
