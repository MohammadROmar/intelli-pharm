import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { useRequiredUser } from '@/shared/model';

import {
  clearOrderDraft,
  DRAFT_SAVE_DELAY_MS,
  getOrderDraftKey,
  loadOrderDraft,
  saveOrderDraft,
} from '../lib/orderDraftStorage';
import {
  createInitialOrderEditorState,
  orderEditorReducer,
} from './orderEditorReducer';
import {
  OrderEditorActionsContext,
  OrderEditorStateContext,
  type OrderEditorActions,
} from './orderEditorContextValue';
import type {
  OrderCartItem,
  OrderEditorPharmacy,
  OrderEditorState,
  OrderEditorStep,
} from './orderEditorTypes';

type Props = PropsWithChildren<{
  draftScope?: string;
  initialState?: OrderEditorState;
  lockDetails?: boolean;
}>;

type ReducerInitializer = {
  initialState: OrderEditorState;
  lockDetails: boolean;
  storageKey: string;
};

function initializeOrderEditor({
  initialState,
  lockDetails,
  storageKey,
}: ReducerInitializer): OrderEditorState {
  return loadOrderDraft(storageKey, initialState, lockDetails);
}

export function OrderEditorProvider({
  children,
  draftScope,
  initialState,
  lockDetails = false,
}: Props) {
  const user = useRequiredUser();
  const fallbackState = useMemo(
    () => initialState ?? createInitialOrderEditorState(),
    [initialState],
  );
  const storageKey = useMemo(
    () => getOrderDraftKey(user.email, draftScope),
    [draftScope, user.email],
  );
  const reducerInitializer = useMemo<ReducerInitializer>(
    () => ({ initialState: fallbackState, lockDetails, storageKey }),
    [fallbackState, lockDetails, storageKey],
  );
  const [state, dispatch] = useReducer(
    orderEditorReducer,
    reducerInitializer,
    initializeOrderEditor,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      saveOrderDraft(storageKey, state, fallbackState);
    }, DRAFT_SAVE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [fallbackState, state, storageKey]);

  const setPharmacy = useCallback(
    (pharmacyId: number | null, pharmacy: OrderEditorPharmacy | null) => {
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
  const scanItem = useCallback((item: OrderCartItem) => {
    dispatch({ type: 'SCAN_ITEM', item });
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
    dispatch({ type: 'RESET', state: fallbackState });
  }, [fallbackState, storageKey]);
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
      scanItem,
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
      scanItem,
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
