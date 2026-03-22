import type { ElementType, PropsWithChildren } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from '@/shared/ui';

type Props = {
  title: string;
  subtitle: string;
  icon: ElementType;
  itemsCount: number;
} & PropsWithChildren;

export function MedicineDetailCard({
  title,
  subtitle,
  icon: Icon,
  itemsCount,
  children,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Icon className="size-4" />
              {title}
            </CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
          {itemsCount > 0 && <Badge variant="secondary">{itemsCount}</Badge>}
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
