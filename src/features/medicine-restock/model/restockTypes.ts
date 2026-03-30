import type { StockEntry } from '@/entities/medicine';

export type RestockFormValues = { stocks: StockEntry[] };

export type RestockPayload = { stocks: StockEntry[] };

export type MedicineRestockFormProps = {
  isPending?: boolean;
  onSubmit: (payload: RestockPayload) => void;
  onReset: () => void;
};

export type StockRow = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};
