import { dummyMedicineDetail } from '../model/dummyMedicine';
import { MedicineDetail } from './MedicineDetail';

export default function MedicineDetailPage() {
  // const { isPending, isError, error } = useGetMedicine();

  return <MedicineDetail medicine={dummyMedicineDetail} />;
}
