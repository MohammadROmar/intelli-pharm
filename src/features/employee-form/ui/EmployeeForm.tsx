import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import type {
  CreateEmployeeFormData,
  EditEmployeeFormData,
  EmployeeInternalFormData,
  BaseEmployeeFormData,
} from '@/entities/employee';
import { FormActions } from '@/shared/ui';

import { PersonalInfoCard } from './PersonalInfoCard';
import { EmployeeInfoCard } from './EmployeeInfoCard';

type CreateProps = {
  mode: 'create';
  onSubmit: SubmitHandler<CreateEmployeeFormData>;
  defaultValues?: never;
  isLoading?: boolean;
  onReset: () => void;
};

type EditProps = {
  mode: 'edit';
  onSubmit: SubmitHandler<EditEmployeeFormData>;
  defaultValues: BaseEmployeeFormData;
  isLoading?: boolean;
  onReset: () => void;
};

type EmployeeFormProps = CreateProps | EditProps;

export function EmployeeForm(props: EmployeeFormProps) {
  const { mode, onSubmit, isLoading, onReset } = props;
  const isEdit = mode === 'edit';

  const methods = useForm<EmployeeInternalFormData>({
    defaultValues: isEdit ? props.defaultValues : { is_active: true },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const handleFormSubmit: SubmitHandler<EmployeeInternalFormData> = (data) => {
    if (mode === 'create') {
      (onSubmit as SubmitHandler<CreateEmployeeFormData>)(
        data as CreateEmployeeFormData,
      );
    } else {
      (onSubmit as SubmitHandler<EditEmployeeFormData>)(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        <PersonalInfoCard isEdit={isEdit} isLoading={isLoading} />
        <EmployeeInfoCard isLoading={isLoading} />
        <FormActions isLoading={isLoading} isEdit={isEdit} onReset={onReset} />
      </form>
    </FormProvider>
  );
}
