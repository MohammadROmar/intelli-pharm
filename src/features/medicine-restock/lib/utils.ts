import type { RestockFormValues, RestockPayload } from '../model/restockTypes';

export function toPayload(values: RestockFormValues): RestockPayload {
  return {
    stocks: values.stocks.map((row) => ({
      warehouse_id: row.warehouse_id,
      quantity: row.quantity,
      expiry_date: row.expiry_date,
    })),
  };
}
