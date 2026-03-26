type Props = { label: string; children: React.ReactNode };

export function DetailCell({ label, children }: Props) {
  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground text-[11px] font-medium tracking-widest uppercase">
        {label}
      </p>
      <div className="text-sm font-semibold">{children}</div>
    </div>
  );
}
