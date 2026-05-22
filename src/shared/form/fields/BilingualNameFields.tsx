import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ARABIC_ONLY, ENGLISH_ONLY } from '../validation/patterns';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from '@/shared/ui';

type BilingualName = { name: { en: string; ar: string } };

type Props = {
  icon?: React.ElementType;
  disabled?: boolean;
  placeholderNamespace?: string;
};

export function BilingualNameFields({
  icon: Icon,
  disabled,
  placeholderNamespace = 'shared',
}: Props) {
  'use no memo';

  const { register } = useFormContext<BilingualName>();
  const { errors } = useFormState<BilingualName>({
    name: ['name.en', 'name.ar'],
  });

  const { t: tShared } = useTranslation('common', {
    keyPrefix: 'form.bilingualName',
  });
  const { t: tPlaceholder } = useTranslation(placeholderNamespace, {
    keyPrefix: 'form',
  });

  return (
    <>
      <Field data-invalid={!!errors.name?.en}>
        <FieldLabel htmlFor="name-en">{tShared('labels.nameEn')}</FieldLabel>
        <Input
          id="name-en"
          icon={Icon}
          disabled={disabled}
          placeholder={tPlaceholder('placeholderNameEn')}
          aria-invalid={!!errors.name?.en}
          {...register('name.en', {
            disabled,
            validate: {
              required: (v) => !!v?.trim() || 'errors.required',
              englishOnly: (v) =>
                !v?.trim() ||
                ENGLISH_ONLY.test(v.trim()) ||
                'errors.englishOnly',
            },
          })}
        />
        <FieldDescription className="text-xs">
          {tShared('hints.nameEn')}
        </FieldDescription>
        {errors.name?.en && (
          <FieldError
            errors={[{ message: tShared(errors.name.en.message!) }]}
          />
        )}
      </Field>

      <Field data-invalid={!!errors.name?.ar}>
        <FieldLabel htmlFor="name-ar">{tShared('labels.nameAr')}</FieldLabel>
        <Input
          id="name-ar"
          icon={Icon}
          disabled={disabled}
          placeholder={tPlaceholder('placeholderNameAr')}
          aria-invalid={!!errors.name?.ar}
          {...register('name.ar', {
            disabled,
            validate: {
              required: (v) => !!v?.trim() || 'errors.required',
              arabicOnly: (v) =>
                !v?.trim() || ARABIC_ONLY.test(v.trim()) || 'errors.arabicOnly',
            },
          })}
        />
        <FieldDescription className="text-xs">
          {tShared('hints.nameAr')}
        </FieldDescription>
        {errors.name?.ar && (
          <FieldError
            errors={[{ message: tShared(errors.name.ar.message!) }]}
          />
        )}
      </Field>
    </>
  );
}
