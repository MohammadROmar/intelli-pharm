import type { StockFormValues, StockPayload } from '../model/stockTypes';

export function toPayload(values: StockFormValues): StockPayload {
  return {
    stocks: values.stocks.map((row) => ({
      warehouse_id: row.warehouse_id,
      quantity: row.quantity,
      expiry_date: row.expiry_date,
    })),
  };
}
