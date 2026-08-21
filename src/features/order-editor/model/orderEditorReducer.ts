import { DEFAULT_ORDER_WAREHOUSE_ID } from '../config/warehouses';
import type {
  OrderCartItem,
  OrderEditorAction,
  OrderEditorState,
} from './orderEditorTypes';

export function createInitialOrderEditorState(): OrderEditorState {
  return {
    step: 'details',
    details: {
      pharmacyId: null,
      pharmacy: null,
      warehouseId: DEFAULT_ORDER_WAREHOUSE_ID,
      notes: '',
    },
    items: [],
    restoredAt: null,
  };
}

function normalizeQuantity(quantity: number, item: OrderCartItem): number {
  if (!Number.isFinite(quantity)) return item.quantity;

  const normalizedQuantity = Math.max(Math.trunc(quantity), 1);

  return item.availableQuantity === null
    ? normalizedQuantity
    : Math.min(normalizedQuantity, item.availableQuantity);
}

export function orderEditorReducer(
  state: OrderEditorState,
  action: OrderEditorAction,
): OrderEditorState {
  switch (action.type) {
    case 'SET_PHARMACY':
      return {
        ...state,
        details: {
          ...state.details,
          pharmacyId: action.pharmacyId,
          pharmacy: action.pharmacy,
        },
      };

    case 'SET_WAREHOUSE':
      return {
        ...state,
        details: { ...state.details, warehouseId: action.warehouseId },
      };

    case 'SET_NOTES':
      return {
        ...state,
        details: { ...state.details, notes: action.notes },
      };

    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'ADD_ITEM': {
      if (
        (action.item.availableQuantity !== null &&
          action.item.availableQuantity < 1) ||
        state.items.some((item) => item.medicineId === action.item.medicineId)
      ) {
        return state;
      }

      return { ...state, items: [...state.items, action.item] };
    }

    case 'SCAN_ITEM': {
      if (
        action.item.availableQuantity === null ||
        action.item.availableQuantity < 1
      ) {
        return state;
      }

      const existingIndex = state.items.findIndex(
        (item) => item.medicineId === action.item.medicineId,
      );

      if (existingIndex === -1) {
        return { ...state, items: [...state.items, action.item] };
      }

      const existingItem = state.items[existingIndex];
      const nextItems = [...state.items];

      nextItems[existingIndex] = {
        ...action.item,
        quantity: Math.min(
          existingItem.quantity + 1,
          action.item.availableQuantity,
        ),
      };

      return { ...state, items: nextItems };
    }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.medicineId === action.medicineId
            ? { ...item, quantity: normalizeQuantity(action.quantity, item) }
            : item,
        ),
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.medicineId !== action.medicineId,
        ),
      };

    case 'DISMISS_RESTORED':
      return { ...state, restoredAt: null };

    case 'RESET':
      return action.state;
  }
}
