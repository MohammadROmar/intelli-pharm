import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '../lib';
import { Field, FieldDescription, FieldLabel } from './Field';

function Switch({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=unchecked]:translate-x-0 ltr:data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)]',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

function SwitchRow({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <Field
      data-invalid={false}
      className="border-border bg-muted/30 flex flex-row items-center justify-between rounded-lg border px-4 py-3"
    >
      <div className="space-y-0.5">
        <FieldLabel htmlFor={id} className="cursor-pointer text-sm font-medium">
          {label}
        </FieldLabel>
        <FieldDescription className="text-xs">{description}</FieldDescription>
      </div>
      <Switch
        disabled={disabled}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </Field>
  );
}

export { Switch, SwitchRow };
