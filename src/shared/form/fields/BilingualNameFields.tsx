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

type BilingualName = {
  name: { en: string; ar: string };
};

type Props = {
  icon?: React.ElementType;
  disabled?: boolean;
  i18nPrefix?: string;
};

export function BilingualNameFields({
  icon: Icon,
  disabled,
  i18nPrefix = 'shared.form.bilingualName',
}: Props) {
  'use no memo';

  const { register } = useFormContext<BilingualName>();
  const { errors } = useFormState<BilingualName>({
    name: ['name.en', 'name.ar', 'name'],
  });

  const { t } = useTranslation();

  return (
    <>
      <Field data-invalid={!!errors.name?.en}>
        <FieldLabel htmlFor="name-en">{t('form.fields.nameEn')}</FieldLabel>
        <Input
          id="name-en"
          icon={Icon}
          disabled={disabled}
          placeholder={t(`${i18nPrefix}.placeholderNameEn`)}
          aria-invalid={!!errors.name?.en}
          {...register('name.en', {
            disabled,
            validate: {
              required: (v) => !!v?.trim() || 'form.errors.required',
              englishOnly: (v) =>
                !v?.trim() ||
                ENGLISH_ONLY.test(v.trim()) ||
                'form.errors.englishOnly',
            },
          })}
        />
        <FieldDescription className="text-xs">
          {t(`form.hints.nameEn`)}
        </FieldDescription>
        {errors.name?.en && (
          <FieldError errors={[{ message: t(errors.name.en.message!) }]} />
        )}
      </Field>

      <Field data-invalid={!!errors.name?.ar}>
        <FieldLabel htmlFor="name-ar">{t('form.fields.nameAr')}</FieldLabel>
        <Input
          id="name-ar"
          icon={Icon}
          disabled={disabled}
          placeholder={t(`${i18nPrefix}.placeholderNameAr`)}
          aria-invalid={!!errors.name?.ar}
          {...register('name.ar', {
            disabled,
            validate: {
              required: (v) => !!v?.trim() || 'form.errors.required',
              arabicOnly: (v) =>
                !v?.trim() ||
                ARABIC_ONLY.test(v.trim()) ||
                'form.errors.arabicOnly',
            },
          })}
        />
        <FieldDescription className="text-xs">
          {t('form.hints.nameAr')}
        </FieldDescription>
        {errors.name?.ar && (
          <FieldError errors={[{ message: t(errors.name.ar.message!) }]} />
        )}
      </Field>
    </>
  );
}
