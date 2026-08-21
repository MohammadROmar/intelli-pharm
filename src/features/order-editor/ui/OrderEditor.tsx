import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { OrderDetail } from '@/entities/order';

import {
  orderToEditorState,
  toCreateOrderPayload,
  toUpdateOrderPayload,
} from '../lib/orderPayload';
import { OrderEditorProvider } from '../model/OrderEditorContext';
import {
  useOrderEditorActions,
  useOrderEditorState,
} from '../model/orderEditorContextValue';
import { useCreateOrder, useUpdateOrder } from '../model/useOrderMutations';
import { MedicineSelectionStep } from './MedicineSelectionStep';
import { OrderDetailsStep } from './OrderDetailsStep';
import { OrderDraftRestored } from './OrderDraftRestored';
import { OrderStepIndicator } from './OrderStepIndicator';
import { OrderUpdateContextCard } from './OrderUpdateContextCard';

type UpdateProps = {
  order: OrderDetail;
};

export function OrderEditor() {
  return (
    <OrderEditorProvider>
      <OrderCreateEditorContent />
    </OrderEditorProvider>
  );
}

export function OrderUpdateEditor({ order }: UpdateProps) {
  const initialState = useMemo(() => orderToEditorState(order), [order]);

  return (
    <OrderEditorProvider
      key={order.id}
      draftScope={`update:${order.id}`}
      initialState={initialState}
      lockDetails
    >
      <OrderUpdateEditorContent order={order} />
    </OrderEditorProvider>
  );
}

function OrderCreateEditorContent() {
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

function OrderUpdateEditorContent({ order }: UpdateProps) {
  const { t } = useTranslation('order-update');
  const navigate = useNavigate();
  const state = useOrderEditorState();
  const actions = useOrderEditorActions();
  const updateOrder = useUpdateOrder(order.id, actions.completeDraft);
  const cartLabels = useMemo(
    () => ({
      back: t('actions.back'),
      submit: t('actions.submit'),
      submitting: t('actions.submitting'),
    }),
    [t],
  );
  const draftLabels = useMemo(
    () => ({
      title: t('draft.restoredTitle'),
      description: t('draft.restoredDescription'),
      discard: t('draft.discard'),
      dismiss: t('draft.dismiss'),
    }),
    [t],
  );

  const handleBack = useCallback(() => {
    navigate(`/dashboard/orders/${order.id}`);
  }, [navigate, order.id]);

  const handleSubmit = useCallback(() => {
    if (state.items.length === 0) return;

    updateOrder.mutate(toUpdateOrderPayload(state));
  }, [state, updateOrder]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      {state.restoredAt ? (
        <OrderDraftRestored
          labels={draftLabels}
          onDismiss={actions.dismissRestored}
          onDiscard={actions.discardDraft}
        />
      ) : null}

      <OrderUpdateContextCard order={order} />

      <MedicineSelectionStep
        cartLabels={cartLabels}
        heading={t('editor.medicinesTitle')}
        isPending={updateOrder.isPending}
        mode="update"
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
