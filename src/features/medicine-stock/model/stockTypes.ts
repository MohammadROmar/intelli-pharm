import type { StockEntry } from '@/entities/medicine';

export type StockFormValues = { stocks: StockEntry[] };

export type StockPayload = { stocks: StockEntry[] };

export type MedicineUpdateStockFormProps = {
  isPending?: boolean;
  onSubmit: (payload: StockPayload) => void;
  onReset: () => void;
  defaultValues?: StockEntry[];
};
