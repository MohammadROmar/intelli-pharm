import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import type { PharmacyOption } from '@/entities/pharmacy';
import { useRequiredUser } from '@/shared/model';

import {
  clearOrderDraft,
  DRAFT_SAVE_DELAY_MS,
  getOrderDraftKey,
  loadOrderDraft,
  saveOrderDraft,
} from '../lib/orderDraftStorage';
import { orderEditorReducer } from './orderEditorReducer';
import {
  OrderEditorActionsContext,
  OrderEditorStateContext,
  type OrderEditorActions,
} from './orderEditorContextValue';
import type { OrderCartItem, OrderEditorStep } from './orderEditorTypes';

export function OrderEditorProvider({ children }: PropsWithChildren) {
  const user = useRequiredUser();
  const storageKey = useMemo(() => getOrderDraftKey(user.email), [user.email]);
  const [state, dispatch] = useReducer(
    orderEditorReducer,
    storageKey,
    loadOrderDraft,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      saveOrderDraft(storageKey, state);
    }, DRAFT_SAVE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [state, storageKey]);

  const setPharmacy = useCallback(
    (pharmacyId: number | null, pharmacy: PharmacyOption | null) => {
      dispatch({ type: 'SET_PHARMACY', pharmacyId, pharmacy });
    },
    [],
  );
  const setWarehouse = useCallback((warehouseId: string) => {
    dispatch({ type: 'SET_WAREHOUSE', warehouseId });
  }, []);
  const setNotes = useCallback((notes: string) => {
    dispatch({ type: 'SET_NOTES', notes });
  }, []);
  const setStep = useCallback((step: OrderEditorStep) => {
    dispatch({ type: 'SET_STEP', step });
  }, []);
  const addItem = useCallback((item: OrderCartItem) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);
  const updateQuantity = useCallback((medicineId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', medicineId, quantity });
  }, []);
  const removeItem = useCallback((medicineId: number) => {
    dispatch({ type: 'REMOVE_ITEM', medicineId });
  }, []);
  const dismissRestored = useCallback(() => {
    dispatch({ type: 'DISMISS_RESTORED' });
  }, []);
  const discardDraft = useCallback(() => {
    clearOrderDraft(storageKey);
    dispatch({ type: 'RESET' });
  }, [storageKey]);
  const completeDraft = useCallback(() => {
    clearOrderDraft(storageKey);
  }, [storageKey]);

  const actions = useMemo<OrderEditorActions>(
    () => ({
      setPharmacy,
      setWarehouse,
      setNotes,
      setStep,
      addItem,
      updateQuantity,
      removeItem,
      dismissRestored,
      discardDraft,
      completeDraft,
    }),
    [
      addItem,
      completeDraft,
      discardDraft,
      dismissRestored,
      removeItem,
      setNotes,
      setPharmacy,
      setStep,
      setWarehouse,
      updateQuantity,
    ],
  );

  return (
    <OrderEditorActionsContext value={actions}>
      <OrderEditorStateContext value={state}>
        {children}
      </OrderEditorStateContext>
    </OrderEditorActionsContext>
  );
}
