import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useFormState } from 'react-hook-form';
import { ScanBarcode } from 'lucide-react';

import type { MedicineFormData } from '@/entities/medicine';
import { BarcodeScanner } from '@/shared/barcode';
import { useFieldError } from '@/shared/lib';
import { Button, Field, FieldError, FieldLabel, Input } from '@/shared/ui';

export function MedicineBarcodeScanner() {
  const { register, setValue } = useFormContext<MedicineFormData>();
  const { errors } = useFormState<MedicineFormData>({ name: ['barcode'] });

  const { t } = useTranslation('medicines', { keyPrefix: 'form' });

  const [scanOpen, setScanOpen] = useState(false);

  const { te } = useFieldError();

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
            {...register('barcode')}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setScanOpen(true)}
          >
            <ScanBarcode className="size-4" />
          </Button>
        </div>
        <FieldError errors={te(errors.barcode, 'barcode')} />
      </Field>

      <BarcodeScanner
        open={scanOpen}
        onOpenChange={setScanOpen}
        onScan={(value) => {
          setValue('barcode', value, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setScanOpen(false);
        }}
      />
    </>
  );
}
