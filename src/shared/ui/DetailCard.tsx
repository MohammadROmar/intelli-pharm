import type { ElementType, PropsWithChildren } from 'react';

import { Badge } from './badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './Card';

type Props = {
  title: string;
  subtitle: string;
  icon: ElementType;
  itemsCount: number;
} & PropsWithChildren;

export function DetailCard({
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

      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}
