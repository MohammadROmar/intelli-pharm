import { useMemo } from 'react';
import { useForm, useFormState, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Loader2, StickyNote, Tag } from 'lucide-react';

import type { NoteType } from '@/entities/pharmacy';
import { cn } from '@/shared/lib';
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/shared/ui';

import { useCreatePharmacyNote } from '../model/useCreatePharmacyNote';

type FormValues = { note_type: NoteType; note: string };

type Props = { pharmacyId: number; onSuccess?: () => void };

const DEFAULT_VALUES: FormValues = { note_type: 'general', note: '' } as const;

const NOTE_MAX_LENGTH = 500;
const NOTE_MIN_LENGTH = 5;

export const CreatePharmacyNoteForm = ({ pharmacyId, onSuccess }: Props) => {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'notes.form' });
  const { mutate, isPending } = useCreatePharmacyNote(pharmacyId);

  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { errors } = useFormState({ control, name: ['note_type', 'note'] });

  const noteTypeOptions = useMemo(
    () => [
      { value: 'general' as const, label: t('noteTypes.general') },
      { value: 'tip' as const, label: t('noteTypes.tip') },
      { value: 'warning' as const, label: t('noteTypes.warning') },
    ],
    [t],
  );

  const onSubmit = (values: FormValues) => {
    mutate(
      { note_type: values.note_type, note: values.note.trim() },
      { onSuccess },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field>
        <FieldLabel htmlFor="note_type">{t('fields.noteType')}</FieldLabel>
        <Controller
          control={control}
          name="note_type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                icon={Tag}
                id="note_type"
                className={cn(errors.note_type && 'border-destructive')}
              >
                <SelectValue placeholder={t('placeholders.noteType')} />
              </SelectTrigger>
              <SelectContent>
                {noteTypeOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.note_type && (
          <FieldError>{t(errors.note_type.message!)}</FieldError>
        )}
      </Field>

      <Field data-invalid={!!errors.note}>
        <FieldLabel htmlFor="note">{t('fields.note')}</FieldLabel>
        <Textarea
          id="note"
          rows={4}
          aria-invalid={!!errors.note}
          icon={StickyNote}
          placeholder={t('placeholders.note')}
          className={cn(errors.note && 'border-destructive')}
          {...register('note', {
            validate: {
              notEmpty: (v) => v.trim().length > 0 || 'errors.noteRequired',
              minLength: (v) =>
                v.trim().length >= NOTE_MIN_LENGTH || 'errors.noteMinLength',
              maxLength: (v) =>
                v.trim().length <= NOTE_MAX_LENGTH || 'errors.noteMaxLength',
            },
          })}
        />
        {errors.note && <FieldError>{t(errors.note.message!)}</FieldError>}
      </Field>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="items-center">
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {t('submit')}
        </Button>
      </div>
    </form>
  );
};
