import type { CreateOrderPayload } from '@/entities/order';

import type { OrderEditorState } from '../model/orderEditorTypes';

export function toCreateOrderPayload(
  state: OrderEditorState,
): CreateOrderPayload {
  if (state.details.pharmacyId === null) {
    throw new Error('Cannot create an order without a pharmacy');
  }

  const notes = state.details.notes.trim();

  return {
    pharmacy_id: state.details.pharmacyId,
    warehouse_id: Number(state.details.warehouseId),
    items: state.items.map((item) => ({
      medicine_id: item.medicineId,
      quantity: item.quantity,
    })),
    ...(notes ? { notes } : {}),
  };
}
