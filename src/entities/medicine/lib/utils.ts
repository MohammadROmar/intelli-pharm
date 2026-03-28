import type { MedicineFormData } from '../model/medicineTypes';

export function medicineToFormData(
  { values, images }: MedicineFormData,
  isEdit: boolean = false,
) {
  const fd = new FormData();
  fd.append('name', values.name);
  fd.append('category_id', values.category_id.toString());
  fd.append('laboratory_id', values.laboratory_id.toString());
  fd.append('price', values.price);
  fd.append('is_imported', values.is_imported ? '1' : '0');
  fd.append('is_active', values.is_active ? '1' : '0');
  fd.append('is_alternative', values.is_alternative ? '1' : '0');

  if (values.note) fd.append('note', values.note);
  if (values.is_alternative && values.is_alternative_to_id)
    fd.append('is_alternative_to_id', values.is_alternative_to_id.toString());

  values.stocks.forEach((s, i) => {
    fd.append(`stocks[${i}][warehouse_id]`, s.warehouse_id);
    fd.append(`stocks[${i}][quantity]`, s.quantity);
    fd.append(`stocks[${i}][expiry_date]`, s.expiry_date);
  });

  images.forEach((img) => fd.append('images[]', img.file));

  if (isEdit) fd.append('_method', 'PUT');

  return fd;
}
