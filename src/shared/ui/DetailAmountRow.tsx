type DetailAmountRowProps = {
  label: string;
  value: string;
  emphasized?: boolean;
  strong?: boolean;
};

export function DetailAmountRow({
  label,
  value,
  emphasized = false,
  strong = false,
}: DetailAmountRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span
        className={
          emphasized
            ? 'font-medium text-badge-success-text'
            : 'text-muted-foreground'
        }
      >
        {label}
      </span>
      <span
        className={
          strong
            ? 'text-end font-bold tabular-nums'
            : 'text-end font-medium tabular-nums'
        }
      >
        {value}
      </span>
    </div>
  );
}
