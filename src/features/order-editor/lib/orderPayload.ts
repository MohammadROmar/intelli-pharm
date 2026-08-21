import type {
  CreateOrderPayload,
  OrderDetail,
  UpdateOrderPayload,
} from '@/entities/order';

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

export function orderToEditorState(order: OrderDetail): OrderEditorState {
  return {
    step: 'medicines',
    details: {
      pharmacyId: order.pharmacy_id,
      pharmacy: order.pharmacy,
      warehouseId: String(order.warehouse_id),
      notes: order.notes ?? '',
    },
    items: order.items
      .filter((item) => item.is_gift === 0)
      .map((item) => ({
        medicineId: item.medicine_id,
        commercialName: item.medicine.commercial_name,
        scientificName: null,
        price: item.unit_price,
        availableQuantity: null,
        image: null,
        quantity: item.quantity,
      })),
    restoredAt: null,
  };
}

export function toUpdateOrderPayload(
  state: OrderEditorState,
): UpdateOrderPayload {
  return {
    items: state.items.map((item) => ({
      medicine_id: item.medicineId,
      quantity: item.quantity,
    })),
  };
}
