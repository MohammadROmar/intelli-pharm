import type { MedicineStock, StockEntry } from '@/entities/medicine';

export function stocksToFormValues(stocks: MedicineStock[]): StockEntry[] {
  return stocks.map(({ warehouse_id, quantity, expiry_date }) => ({
    warehouse_id: String(warehouse_id),
    quantity: String(quantity),
    expiry_date,
  }));
}
