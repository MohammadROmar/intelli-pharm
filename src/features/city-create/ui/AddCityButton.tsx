import { CreateCityForm } from './CreateCityForm';
import { CitySheet } from '@/entities/city';

export function AddCityButton() {
  return (
    <CitySheet>
      <CreateCityForm />
    </CitySheet>
  );
}
