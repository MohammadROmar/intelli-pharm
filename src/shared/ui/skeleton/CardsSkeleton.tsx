import { Skeleton } from './Skeleton';

export function CardsSkeleton() {
  return (
    <div className="grid size-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton
          key={`card-skeleton-${i}`}
          className="size-full"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
