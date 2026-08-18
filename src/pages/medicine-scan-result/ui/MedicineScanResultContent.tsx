import { BarcodeScanResultCard } from './BarcodeScanResultCard';
import { useGetMedicineByBarcodeSuspense } from '../model/useGetMedicineByBarcodeSuspense';

type MedicineScanResultContentProps = {
  barcode: string;
};

export default function MedicineScanResultContent({
  barcode,
}: MedicineScanResultContentProps) {
  const { data } = useGetMedicineByBarcodeSuspense(barcode);

  return <BarcodeScanResultCard result={data.data!} />;
}
