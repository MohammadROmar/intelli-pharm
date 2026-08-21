import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  getMedicineByBarcode,
  type BarcodeScanResult,
} from '@/entities/medicine';
import { unwrapApiResponse, type ApiError } from '@/shared/api';

import { medicineToCartItem } from '../lib/medicineAlternatives';
import {
  useOrderEditorActions,
  useOrderEditorState,
} from './orderEditorContextValue';

const BARCODE_TOAST_ID = 'order-medicine-barcode';
export const ORDER_MEDICINE_BARCODE_MUTATION_KEY = [
  'orders',
  'medicine-barcode',
] as const;

type Options = {
  onUnavailableMedicine?: (medicine: BarcodeScanResult) => void;
};

export function useOrderMedicineBarcodeScan({
  onUnavailableMedicine,
}: Options = {}) {
  const { t } = useTranslation('order-form', {
    keyPrefix: 'medicines.barcode',
  });
  const { items } = useOrderEditorState();
  const actions = useOrderEditorActions();
  const itemsRef = useRef(items);
  const requestInFlightRef = useRef(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const handleSuccess = useCallback(
    (medicine: BarcodeScanResult) => {
      const available =
        medicine.is_active &&
        medicine.in_stock &&
        medicine.available_quantity > 0;

      if (!available) {
        toast.warning(t('unavailableTitle'), {
          id: BARCODE_TOAST_ID,
          description: t('unavailableDescription', {
            medicine: medicine.commercial_name,
          }),
        });
        onUnavailableMedicine?.(medicine);
        return;
      }

      const existingItem = itemsRef.current.find(
        (item) => item.medicineId === medicine.id,
      );
      const scannedItem = medicineToCartItem(medicine);

      actions.scanItem(scannedItem);

      if (
        existingItem &&
        existingItem.quantity >= medicine.available_quantity
      ) {
        const refreshedItem = {
          ...scannedItem,
          quantity: medicine.available_quantity,
        };

        itemsRef.current = itemsRef.current.map((item) =>
          item.medicineId === medicine.id ? refreshedItem : item,
        );

        toast.warning(t('stockLimitTitle'), {
          id: BARCODE_TOAST_ID,
          description: t('stockLimitDescription', {
            medicine: medicine.commercial_name,
            count: medicine.available_quantity,
          }),
        });
        return;
      }

      const nextQuantity = existingItem ? existingItem.quantity + 1 : 1;
      const nextItem = { ...scannedItem, quantity: nextQuantity };

      itemsRef.current = existingItem
        ? itemsRef.current.map((item) =>
            item.medicineId === medicine.id ? nextItem : item,
          )
        : [...itemsRef.current, nextItem];

      toast.success(
        t(existingItem ? 'quantityUpdatedTitle' : 'addedTitle'),
        {
          id: BARCODE_TOAST_ID,
          description: t(
            existingItem
              ? 'quantityUpdatedDescription'
              : 'addedDescription',
            {
              medicine: medicine.commercial_name,
              quantity: nextQuantity,
            },
          ),
        },
      );
    },
    [actions, onUnavailableMedicine, t],
  );

  const handleError = useCallback(
    (error: ApiError, barcode: string) => {
      const notFound = error.status === 404;

      toast.error(t(notFound ? 'notFoundTitle' : 'errorTitle'), {
        id: BARCODE_TOAST_ID,
        description: t(
          notFound ? 'notFoundDescription' : 'errorDescription',
          { barcode },
        ),
      });
    },
    [t],
  );

  const handleSettled = useCallback(() => {
    requestInFlightRef.current = false;
  }, []);

  const { mutate, isPending } = useMutation<
    BarcodeScanResult,
    ApiError,
    string
  >({
    mutationKey: ORDER_MEDICINE_BARCODE_MUTATION_KEY,
    mutationFn: async (barcode) =>
      unwrapApiResponse(await getMedicineByBarcode(barcode)),
  });

  const scanBarcode = useCallback(
    (rawBarcode: string) => {
      const barcode = rawBarcode.trim();

      if (!barcode || requestInFlightRef.current) return;

      requestInFlightRef.current = true;
      mutate(barcode, {
        onSuccess: handleSuccess,
        onError: handleError,
        onSettled: handleSettled,
      });
    },
    [handleError, handleSettled, handleSuccess, mutate],
  );

  return { scanBarcode, isPending };
}
