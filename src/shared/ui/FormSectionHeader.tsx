type FormSectionHeaderProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export function FormSectionHeader({
  icon: Icon,
  title,
  description,
}: FormSectionHeaderProps) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="bg-primary/10 text-primary mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}
