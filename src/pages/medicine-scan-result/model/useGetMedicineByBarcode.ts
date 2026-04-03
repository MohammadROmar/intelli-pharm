import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import type { ApiError, ApiResponse } from '@/shared/api';
import {
  getMedicineByBarcode,
  type BarcodeScanResult,
} from '@/entities/medicine';

export function useGetMedicineByBarcode() {
  const { barcode } = useParams();

  const decodedBarcode = decodeURIComponent(barcode ?? '');

  return useQuery<ApiResponse<BarcodeScanResult>, ApiError>({
    queryKey: ['medicines', `barcode-${barcode}`],
    queryFn: () => {
      if (!barcode) throw new Error('Barcode is required');

      return getMedicineByBarcode(decodedBarcode);
    },
    enabled: Boolean(barcode),
  });
}
