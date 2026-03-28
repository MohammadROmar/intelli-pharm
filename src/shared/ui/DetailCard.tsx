import type { ElementType, PropsWithChildren } from 'react';

import { Badge } from './badge';
import { Card, CardContent, CardHeader } from './Card';
import { CardSectionHeader } from './CardSectionHeader';

type Props = {
  title: string;
  subtitle: string;
  icon: ElementType;
  itemsCount?: number;
  className?: string;
} & PropsWithChildren;

export function DetailCard({
  title,
  subtitle,
  icon,
  itemsCount = 0,
  className,
  children,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardSectionHeader
            title={title}
            description={subtitle}
            icon={icon}
            className="mb-0!"
          />
          {itemsCount > 0 && <Badge variant="secondary">{itemsCount}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}
