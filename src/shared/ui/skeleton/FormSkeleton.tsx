import { Skeleton } from './Skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '../Card';

type Props = { cards: { rows: number }[] };

function ActionButtonsSkeleton() {
  return (
    <>
      <Skeleton className="h-9 w-full lg:w-16" />
      <Skeleton className="h-9 w-full lg:w-14" />
    </>
  );
}

export function FormSkeleton({ cards }: Props) {
  const singleCard = cards.length === 1;

  return (
    <div className="space-y-4 overflow-y-hidden">
      <div className="space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-5 w-56" />
      </div>

      {cards.map(({ rows }, i) => (
        <Card key={`form-skeleton-card-${i}`}>
          <CardHeader className="space-y-0.5">
            <div className="flex items-start gap-3">
              <Skeleton className="size-9" />
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-1 space-y-5">
            {Array.from({ length: rows }).map((_, j) => (
              <div key={`form-skeleton-field-${i}-${j}`} className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
          </CardContent>
          {singleCard && (
            <CardFooter className="flex w-full flex-col gap-2 lg:flex-row lg:items-end lg:justify-end">
              <ActionButtonsSkeleton />
            </CardFooter>
          )}
        </Card>
      ))}
      {!singleCard && (
        <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-end lg:justify-end">
          <ActionButtonsSkeleton />
        </div>
      )}
    </div>
  );
}
