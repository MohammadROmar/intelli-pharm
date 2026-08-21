import type { PharmacyOption } from '@/entities/pharmacy';

export type OrderEditorStep = 'details' | 'medicines';

export type OrderEditorDetails = {
  pharmacyId: number | null;
  pharmacy: PharmacyOption | null;
  warehouseId: string;
  notes: string;
};

export type OrderCartItem = {
  medicineId: number;
  commercialName: string;
  scientificName: string | null;
  price: string;
  availableQuantity: number;
  image: string | null;
  quantity: number;
};

export type OrderEditorState = {
  step: OrderEditorStep;
  details: OrderEditorDetails;
  items: OrderCartItem[];
  restoredAt: string | null;
};

export type OrderEditorAction =
  | {
      type: 'SET_PHARMACY';
      pharmacyId: number | null;
      pharmacy: PharmacyOption | null;
    }
  | { type: 'SET_WAREHOUSE'; warehouseId: string }
  | { type: 'SET_NOTES'; notes: string }
  | { type: 'SET_STEP'; step: OrderEditorStep }
  | { type: 'ADD_ITEM'; item: OrderCartItem }
  | { type: 'UPDATE_QUANTITY'; medicineId: number; quantity: number }
  | { type: 'REMOVE_ITEM'; medicineId: number }
  | { type: 'DISMISS_RESTORED' }
  | { type: 'RESET' };
