import type { TFunction } from 'i18next';

import { cn } from '@/shared/lib';

import { Checkbox } from './Checkbox';

import type { ParsedAction } from '../lib/permissionParser';
import { getActionPresentation } from '../lib/permissionPresentation';

type PermissionToggleProps = {
  parsedAction: ParsedAction;
  checked: boolean;
  disabled: boolean;
  onToggle: (permission: ParsedAction['permission']) => void;
  t: TFunction<'permissions'>;
};

export function PermissionToggle({
  parsedAction,
  checked,
  disabled,
  onToggle,
  t,
}: PermissionToggleProps) {
  const { permission } = parsedAction;
  const { style, label, scopeLabel } = getActionPresentation(parsedAction, t);
  const inputId = `permission-${permission}`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
        style,
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'ring-offset-background has-focus-visible:ring-ring cursor-pointer hover:brightness-95 has-focus-visible:ring-2 has-focus-visible:ring-offset-2',
      )}
    >
      <Checkbox
        id={inputId}
        checked={checked}
        disabled={disabled}
        onCheckedChange={() => onToggle(permission)}
        className="dark:border-foreground/25! data-[state=checked]:border-primary! size-3.5 cursor-pointer shadow-none"
      />
      <span>{label}</span>
      {scopeLabel ? (
        <span className="border-s border-current/20 ps-1 text-[10px] font-normal opacity-70">
          {scopeLabel}
        </span>
      ) : null}
    </label>
  );
}
