import { useCallback, useMemo } from 'react';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PlusCircle, StickyNote, Tag, Trash2 } from 'lucide-react';

import type { PharmacyFormValues, NoteType } from '@/entities/pharmacy';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldError,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  CardSectionHeader,
  FieldLabel,
} from '@/shared/ui';

type NotesCardProps = { isPending?: boolean };
type NoteTypeOption = { value: NoteType; label: string };

export function NotesCard({ isPending }: NotesCardProps) {
  const { t } = useTranslation('pharmacies', { keyPrefix: 'form.notes' });

  const { control, register, getFieldState } =
    useFormContext<PharmacyFormValues>();

  const formState = useFormState<PharmacyFormValues>({
    control,
    name: ['notes'],
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'notes' });

  const noteTypeOptions = useMemo<NoteTypeOption[]>(
    () => [
      { value: 'general', label: t('type.general') },
      { value: 'tip', label: t('type.tip') },
      { value: 'warning', label: t('type.warning') },
    ],
    [t],
  );

  const handleAdd = useCallback(() => {
    append({ note_type: 'general', note: '' }, { shouldFocus: false });
  }, [append]);

  return (
    <Card>
      <CardHeader className="flex! flex-wrap items-center! justify-between! gap-4 space-y-0">
        <CardSectionHeader
          icon={StickyNote}
          title={t('title')}
          description={t('subtitle')}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-primary gap-2"
          onClick={handleAdd}
          disabled={isPending}
        >
          <PlusCircle className="size-4" />
          {t('add')}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {fields.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            {t('empty')}
          </p>
        ) : (
          fields.map((field, index) => {
            const noteId = `note_${field.id}`;
            const fieldState = getFieldState(`notes.${index}.note`, formState);

            return (
              <div
                key={field.id}
                className="border-border bg-muted/20 relative rounded-lg border p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-md text-xs"
                  >
                    {t('noteItem')} #{index + 1}
                  </Badge>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    disabled={isPending}
                    aria-label={t('remove')}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <Field className="flex w-full flex-col sm:w-48">
                    <FieldLabel asChild>
                      <p>{t('label.noteType')}</p>
                    </FieldLabel>
                    <Controller
                      control={control}
                      name={`notes.${index}.note_type`}
                      render={({ field: typeField }) => (
                        <Select
                          value={typeField.value}
                          onValueChange={typeField.onChange}
                          onOpenChange={(open) => !open && typeField.onBlur()}
                          disabled={isPending}
                        >
                          <SelectTrigger
                            ref={typeField.ref}
                            icon={Tag}
                            className="w-full"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {noteTypeOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>

                  <Field
                    className="w-full flex-1"
                    aria-invalid={!!fieldState.error}
                  >
                    <FieldLabel htmlFor={noteId}>{t('label.note')}</FieldLabel>
                    <Input
                      id={noteId}
                      icon={StickyNote}
                      {...register(`notes.${index}.note`, {
                        validate: (v) =>
                          (v ?? '').trim() !== '' || 'validation.required',
                      })}
                      aria-invalid={!!fieldState.error}
                      placeholder={t('placeholder')}
                      disabled={isPending}
                    />
                    {fieldState.error?.message && (
                      <FieldError>{t(fieldState.error.message)}</FieldError>
                    )}
                  </Field>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
