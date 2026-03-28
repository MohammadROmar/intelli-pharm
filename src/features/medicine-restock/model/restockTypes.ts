import type { StockEntry } from '@/entities/medicine';

export type RestockFormValues = { stocks: StockEntry[] };

export type RestockPayload = { stocks: StockEntry[] };
