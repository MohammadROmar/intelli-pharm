import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { toCreateOrderPayload } from '../lib/orderPayload';
import { OrderEditorProvider } from '../model/OrderEditorContext';
import {
  useOrderEditorActions,
  useOrderEditorState,
} from '../model/orderEditorContextValue';
import { useCreateOrder } from '../model/useOrderMutations';
import { MedicineSelectionStep } from './MedicineSelectionStep';
import { OrderDetailsStep } from './OrderDetailsStep';
import { OrderDraftRestored } from './OrderDraftRestored';
import { OrderStepIndicator } from './OrderStepIndicator';

export function OrderEditor() {
  return (
    <OrderEditorProvider>
      <OrderEditorContent />
    </OrderEditorProvider>
  );
}

function OrderEditorContent() {
  const navigate = useNavigate();
  const state = useOrderEditorState();
  const actions = useOrderEditorActions();
  const createOrder = useCreateOrder();

  const handleSubmit = useCallback(() => {
    if (state.items.length === 0 || state.details.pharmacyId === null) return;

    createOrder.mutate(toCreateOrderPayload(state), {
      onSuccess: (response) => {
        actions.completeDraft();
        const orderId = response.data?.id;
        navigate(
          orderId ? `/dashboard/orders/${orderId}` : '/dashboard/orders',
        );
      },
    });
  }, [actions, createOrder, navigate, state]);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <OrderStepIndicator currentStep={state.step} />

      {state.restoredAt ? (
        <OrderDraftRestored
          onDismiss={actions.dismissRestored}
          onDiscard={actions.discardDraft}
        />
      ) : null}

      {state.step === 'details' ? (
        <OrderDetailsStep key={state.restoredAt ?? 'fresh'} />
      ) : (
        <MedicineSelectionStep
          isPending={createOrder.isPending}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
