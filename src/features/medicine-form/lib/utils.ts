import {
  type Medicine,
  type MedicineFormData,
  type StockEntry,
} from '@/entities/medicine';

export function medicineToFromData(medicine: Medicine): MedicineFormData {
  const is_alternative = medicine.alternative_for.length > 0;

  const stocks: StockEntry[] = medicine.stocks.map(
    ({ warehouse_id, quantity, expiry_date }) => ({
      expiry_date,
      quantity: quantity.toString(),
      warehouse_id: warehouse_id.toString(),
    }),
  );

  return {
    ...medicine,
    stocks,
    is_alternative,
    note: medicine.note ?? '',
    imagesCount: medicine.images.length,
    is_alternative_to_id: is_alternative
      ? medicine.alternative_for[0].id
      : null,
  };
}
