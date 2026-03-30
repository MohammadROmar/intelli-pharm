import { cn } from '../lib';

type CardSectionHeaderProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
};

export function CardSectionHeader({
  icon: Icon,
  title,
  description,
  className,
}: CardSectionHeaderProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <div className="bg-primary/10 text-primary mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}
