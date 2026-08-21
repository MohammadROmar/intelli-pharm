import type { AlternativeMedicine, Medicine } from '@/entities/medicine';

import type { OrderCartItem } from '../model/orderEditorTypes';

export function mergeMedicineAlternatives(
  currentMedicineId: number,
  alternatives: AlternativeMedicine[],
  alternativeFor: AlternativeMedicine[],
): AlternativeMedicine[] {
  const unique = new Map<number, AlternativeMedicine>();

  for (const medicine of [...alternatives, ...alternativeFor]) {
    if (medicine.id !== currentMedicineId) {
      unique.set(medicine.id, medicine);
    }
  }

  return [...unique.values()].sort((first, second) => {
    const firstAvailable = first.is_active && first.available_quantity > 0;
    const secondAvailable = second.is_active && second.available_quantity > 0;

    if (firstAvailable === secondAvailable) {
      return second.available_quantity - first.available_quantity;
    }

    return firstAvailable ? -1 : 1;
  });
}

export function medicineToCartItem(medicine: Medicine): OrderCartItem {
  return {
    medicineId: medicine.id,
    commercialName: medicine.commercial_name,
    scientificName: medicine.scientific_name,
    price: medicine.price,
    availableQuantity: medicine.available_quantity,
    image: medicine.images[0] ?? null,
    quantity: 1,
  };
}

export function alternativeToCartItem(
  medicine: AlternativeMedicine,
  language: 'ar' | 'en',
): OrderCartItem {
  return {
    medicineId: medicine.id,
    commercialName: medicine.commercial_name[language],
    scientificName: null,
    price: medicine.price,
    availableQuantity: medicine.available_quantity,
    image: medicine.images[0] ?? null,
    quantity: 1,
  };
}
