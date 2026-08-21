import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Boxes, Cross, ShoppingBasket } from 'lucide-react';

import { Badge, Button, Card, CardContent } from '@/shared/ui';

import {
  useOrderEditorActions,
  useOrderEditorState,
} from '../model/orderEditorContextValue';
import { MedicineCatalog } from './MedicineCatalog';
import { OrderCart } from './OrderCart';
import { OrderCartSheet } from './OrderCartSheet';

type Props = {
  isPending: boolean;
  onSubmit: () => void;
};

export function MedicineSelectionStep({ isPending, onSubmit }: Props) {
  const { t } = useTranslation('order-form', { keyPrefix: 'medicines' });
  const [cartOpen, setCartOpen] = useState(false);
  const state = useOrderEditorState();
  const actions = useOrderEditorActions();
  const totalUnits = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );
  const handleBack = useCallback(() => {
    setCartOpen(false);
    actions.setStep('details');
  }, [actions]);

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <Cross
              className="text-muted-foreground size-4 shrink-0"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{t('pharmacy')}:</span>
            <strong className="truncate">
              {state.details.pharmacy?.name ?? t('selectedPharmacy')}
            </strong>
          </span>
          <span className="flex items-center gap-2">
            <Boxes
              className="text-muted-foreground size-4"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{t('warehouse')}:</span>
            <strong>{t('mainWarehouse')}</strong>
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          disabled={isPending}
          onClick={handleBack}
        >
          {t('editDetails')}
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3 lg:hidden">
        <div>
          <h2 className="text-base font-semibold">{t('title')}</h2>
          <p className="text-muted-foreground text-xs">
            {t('selectedSummary', {
              medicines: state.items.length,
              units: totalUnits,
            })}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="relative gap-2"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBasket className="size-4" aria-hidden="true" />
          {t('openCart')}
          {state.items.length > 0 ? (
            <Badge
              variant="default"
              className="absolute -end-2 -top-2 min-w-5 justify-center px-1.5"
            >
              {state.items.length}
            </Badge>
          ) : null}
        </Button>
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-start">
        <Card className="min-w-0">
          <CardContent className="p-4 sm:p-5">
            <MedicineCatalog />
          </CardContent>
        </Card>

        <Card className="sticky top-4 hidden lg:block">
          <CardContent className="p-4">
            <OrderCart
              items={state.items}
              isPending={isPending}
              onBack={handleBack}
              onSubmit={onSubmit}
              onQuantityChange={actions.updateQuantity}
              onRemove={actions.removeItem}
            />
          </CardContent>
        </Card>
      </div>

      <OrderCartSheet
        open={cartOpen}
        items={state.items}
        isPending={isPending}
        onOpenChange={setCartOpen}
        onBack={handleBack}
        onSubmit={onSubmit}
        onQuantityChange={actions.updateQuantity}
        onRemove={actions.removeItem}
      />
    </div>
  );
}
