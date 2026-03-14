import type { MedicineDetail } from './medicineDetailTypes';

export const dummyMedicineDetail: MedicineDetail = {
  id: 1,
  category_id: 101,
  name: 'Paracetamol 500mg',
  price: '5.99',
  is_imported: 0,
  is_active: 1,
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-02-20T14:25:00Z',
  category: {
    id: 101,
    name: 'Pain Relief',
  },
  alternatives: [
    {
      id: 2,
      name: 'Acetaminophen 500mg',
      price: '4.99',
      is_imported: 0,
      pivot: {
        medicine_id: 1,
        alternative_id: 2,
        note: 'Generic alternative with same active ingredient',
      },
    },
    {
      id: 3,
      name: 'Tylenol Extra Strength',
      price: '8.99',
      is_imported: 1,
      pivot: {
        medicine_id: 1,
        alternative_id: 3,
        note: 'Brand name option, imported',
      },
    },
    {
      id: 4,
      name: 'Panadol Advance',
      price: '7.50',
      is_imported: 1,
      pivot: {
        medicine_id: 1,
        alternative_id: 4,
        note: 'Alternative brand, patients prefer this',
      },
    },
  ],
  images: [],
};
