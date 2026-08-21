import { DEFAULT_ORDER_WAREHOUSE_ID } from '../config/warehouses';
import { createInitialOrderEditorState } from '../model/orderEditorReducer';
import type {
  OrderCartItem,
  OrderEditorState,
  OrderEditorStep,
} from '../model/orderEditorTypes';

const DRAFT_SCHEMA_VERSION = 1;
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const DRAFT_SAVE_DELAY_MS = 350;

type StoredOrderDraft = {
  version: typeof DRAFT_SCHEMA_VERSION;
  updatedAt: string;
  step: OrderEditorStep;
  details: OrderEditorState['details'];
  items: OrderCartItem[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isCartItem(value: unknown): value is OrderCartItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.medicineId === 'number' &&
    Number.isInteger(value.medicineId) &&
    typeof value.commercialName === 'string' &&
    (typeof value.scientificName === 'string' ||
      value.scientificName === null) &&
    typeof value.price === 'string' &&
    ((typeof value.availableQuantity === 'number' &&
      value.availableQuantity > 0) ||
      value.availableQuantity === null) &&
    (typeof value.image === 'string' || value.image === null) &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0 &&
    (value.availableQuantity === null ||
      value.quantity <= value.availableQuantity)
  );
}

function isStoredDraft(value: unknown): value is StoredOrderDraft {
  if (!isRecord(value) || !isRecord(value.details)) return false;

  const pharmacy = value.details.pharmacy;
  const hasValidPharmacy =
    pharmacy === null ||
    (isRecord(pharmacy) &&
      typeof pharmacy.id === 'number' &&
      typeof pharmacy.name === 'string');

  const items = value.items;
  const hasValidItems =
    Array.isArray(items) &&
    items.every(isCartItem) &&
    new Set(items.map((item) => item.medicineId)).size === items.length;

  return (
    value.version === DRAFT_SCHEMA_VERSION &&
    typeof value.updatedAt === 'string' &&
    (value.step === 'details' || value.step === 'medicines') &&
    ((typeof value.details.pharmacyId === 'number' &&
      Number.isInteger(value.details.pharmacyId) &&
      value.details.pharmacyId > 0) ||
      value.details.pharmacyId === null) &&
    hasValidPharmacy &&
    value.details.warehouseId === DEFAULT_ORDER_WAREHOUSE_ID &&
    typeof value.details.notes === 'string' &&
    hasValidItems
  );
}

function hashIdentity(identity: string): string {
  let hash = 5381;

  for (let index = 0; index < identity.length; index += 1) {
    hash = (hash * 33) ^ identity.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}

export function getOrderDraftKey(email: string, scope?: string): string {
  const baseKey = `order_editor_draft_v${DRAFT_SCHEMA_VERSION}_${hashIdentity(
    email.trim().toLowerCase(),
  )}`;

  return scope ? `${baseKey}_${hashIdentity(scope)}` : baseKey;
}

export function loadOrderDraft(
  storageKey: string,
  initialState = createInitialOrderEditorState(),
  lockDetails = false,
): OrderEditorState {
  if (typeof window === 'undefined') return initialState;

  try {
    const storedValue = window.localStorage.getItem(storageKey);
    if (!storedValue) return initialState;

    const draft: unknown = JSON.parse(storedValue);
    if (!isStoredDraft(draft)) {
      window.localStorage.removeItem(storageKey);
      return initialState;
    }

    const updatedAt = Date.parse(draft.updatedAt);
    if (Number.isNaN(updatedAt) || Date.now() - updatedAt > DRAFT_MAX_AGE_MS) {
      window.localStorage.removeItem(storageKey);
      return initialState;
    }

    return {
      step: lockDetails
        ? initialState.step
        : draft.step === 'medicines' && draft.details.pharmacyId !== null
          ? 'medicines'
          : 'details',
      details: lockDetails ? initialState.details : draft.details,
      items: draft.items,
      restoredAt: draft.updatedAt,
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[order-editor] Failed to restore draft:', error);
    }
    return initialState;
  }
}

export function saveOrderDraft(
  storageKey: string,
  state: OrderEditorState,
  baselineState: OrderEditorState,
): void {
  if (typeof window === 'undefined') return;

  const hasItemChanges =
    state.items.length !== baselineState.items.length ||
    state.items.some((item, index) => {
      const baselineItem = baselineState.items[index];

      return (
        !baselineItem ||
        item.medicineId !== baselineItem.medicineId ||
        item.quantity !== baselineItem.quantity
      );
    });
  const hasChanges =
    state.step !== baselineState.step ||
    state.details.pharmacyId !== baselineState.details.pharmacyId ||
    state.details.warehouseId !== baselineState.details.warehouseId ||
    state.details.notes !== baselineState.details.notes ||
    hasItemChanges;

  if (!hasChanges) {
    clearOrderDraft(storageKey);
    return;
  }

  const draft: StoredOrderDraft = {
    version: DRAFT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    step: state.step,
    details: state.details,
    items: state.items,
  };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[order-editor] Failed to save draft:', error);
    }
  }
}

export function clearOrderDraft(storageKey: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(storageKey);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[order-editor] Failed to clear draft:', error);
    }
  }
}

export { DRAFT_SAVE_DELAY_MS };
