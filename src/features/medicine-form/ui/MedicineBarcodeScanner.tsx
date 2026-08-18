import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useFormState } from 'react-hook-form';
import { ScanBarcode } from 'lucide-react';

import type { MedicineFormData } from '@/entities/medicine';
import { BarcodeScanner, useKeyboardBarcodeScanner } from '@/shared/barcode';
import { cn, useFieldError } from '@/shared/lib';
import { Button, Field, FieldError, FieldLabel, Input } from '@/shared/ui';

const SCAN_HIGHLIGHT_MS = 1600;

type Props = { isPending?: boolean };

export function MedicineBarcodeScanner({ isPending }: Props) {
  const { register, setValue } = useFormContext<MedicineFormData>();
  const { errors } = useFormState<MedicineFormData>({ name: ['barcode'] });

  const { t } = useTranslation('medicines', { keyPrefix: 'form' });
  const { te } = useFieldError();

  const [scanOpen, setScanOpen] = useState(false);
  const [justScanned, setJustScanned] = useState(false);

  const applyScan = useCallback(
    (value: string) => {
      setValue('barcode', value, { shouldDirty: true, shouldValidate: true });
      setJustScanned(true);
    },
    [setValue],
  );

  useKeyboardBarcodeScanner({ enabled: !isPending, onScan: applyScan });

  useEffect(() => {
    if (!justScanned) return;

    const timeoutId = setTimeout(
      () => setJustScanned(false),
      SCAN_HIGHLIGHT_MS,
    );
    return () => clearTimeout(timeoutId);
  }, [justScanned]);

  const handleDialogScan = useCallback(
    (value: string) => {
      applyScan(value);
      setScanOpen(false);
    },
    [applyScan],
  );

  const handleOpenScan = useCallback(() => setScanOpen(true), []);

  const handleBarcodeKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') event.preventDefault();
    },
    [],
  );

  return (
    <>
      <Field data-invalid={!!errors.barcode}>
        <FieldLabel htmlFor="barcode">{t('barcode')}</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="barcode"
            placeholder={t('barcodePlaceholder')}
            autoComplete="off"
            icon={ScanBarcode}
            aria-invalid={!!errors.barcode}
            onKeyDown={handleBarcodeKeyDown}
            className={cn(
              'transition-shadow duration-300',
              justScanned && 'ring-primary/60 ring-2',
            )}
            {...register('barcode', { disabled: isPending })}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isPending}
            onClick={handleOpenScan}
          >
            <ScanBarcode className="size-4" />
          </Button>
        </div>
        <FieldError errors={te(errors.barcode, 'barcode')} />
      </Field>

      <BarcodeScanner
        open={scanOpen}
        onOpenChange={setScanOpen}
        onScan={handleDialogScan}
      />
    </>
  );
}
