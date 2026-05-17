import { useSuspenseQuery } from '@tanstack/react-query';

import {
  getMedicineByBarcode,
  type BarcodeScanResult,
} from '@/entities/medicine';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetMedicineByBarcodeSuspense(barcode: string) {
  const decodedBarcode = decodeURIComponent(barcode);

  return useSuspenseQuery<ApiResponse<BarcodeScanResult>, ApiError>({
    queryKey: ['medicines', `barcode-${barcode}`],
    queryFn: () => getMedicineByBarcode(decodedBarcode),
  });
}
