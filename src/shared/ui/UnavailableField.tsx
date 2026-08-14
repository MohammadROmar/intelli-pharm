import { ShieldOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type UnavailableFieldProps = {
  label?: string;
  invalid?: boolean;
};

export function UnavailableField({
  label,
  invalid = false,
}: UnavailableFieldProps) {
  const { t } = useTranslation();

  return (
    <div
      role="group"
      aria-disabled="true"
      aria-invalid={invalid || undefined}
      data-slot="unavailable-field-control"
      className="border-input bg-muted/40 text-muted-foreground aria-invalid:border-destructive flex min-h-9 w-full items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow]"
    >
      <ShieldOff className="size-4 shrink-0" aria-hidden="true" />

      <span className="min-w-0 truncate">
        {label ?? t('filters.unavailable')}
      </span>
    </div>
  );
}
