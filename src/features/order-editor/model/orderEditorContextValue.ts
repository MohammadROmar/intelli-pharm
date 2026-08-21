import { createContext, useContext } from 'react';

import type { PharmacyOption } from '@/entities/pharmacy';

import type {
  OrderCartItem,
  OrderEditorState,
  OrderEditorStep,
} from './orderEditorTypes';

export type OrderEditorActions = {
  setPharmacy: (
    pharmacyId: number | null,
    pharmacy: PharmacyOption | null,
  ) => void;
  setWarehouse: (warehouseId: string) => void;
  setNotes: (notes: string) => void;
  setStep: (step: OrderEditorStep) => void;
  addItem: (item: OrderCartItem) => void;
  scanItem: (item: OrderCartItem) => void;
  updateQuantity: (medicineId: number, quantity: number) => void;
  removeItem: (medicineId: number) => void;
  dismissRestored: () => void;
  discardDraft: () => void;
  completeDraft: () => void;
};

export const OrderEditorStateContext = createContext<OrderEditorState | null>(
  null,
);

export const OrderEditorActionsContext =
  createContext<OrderEditorActions | null>(null);

export function useOrderEditorState(): OrderEditorState {
  const context = useContext(OrderEditorStateContext);

  if (!context) {
    throw new Error(
      'useOrderEditorState must be used within OrderEditorProvider',
    );
  }

  return context;
}

export function useOrderEditorActions(): OrderEditorActions {
  const context = useContext(OrderEditorActionsContext);

  if (!context) {
    throw new Error(
      'useOrderEditorActions must be used within OrderEditorProvider',
    );
  }

  return context;
}
