import { SIDEBAR_WIDTH } from '@/shared/config';
import { Skeleton, CardsSkeleton } from '@/shared/ui';

export default function DashboardSkeleton() {
  return (
    <div
      className="relative grid h-dvh w-screen grid-cols-1 overflow-hidden md:grid-cols-[16rem_1fr]"
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
        } as React.CSSProperties
      }
    >
      <SidebarSkeleton />
      <div className="relative grid grid-rows-[auto_1fr]">
        <HeaderSkeleton />
        <main className="size-full">
          <CardsSkeleton />
        </main>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="hidden size-full md:block">
      <Skeleton className="size-full rounded-none" />
    </aside>
  );
}

function HeaderSkeleton() {
  return (
    <header className="flex h-16 items-center justify-between border-b p-4 px-3">
      <div className="h-full">
        <Skeleton className="size-9 border md:hidden" />
        <div className="hidden h-full w-fit items-center gap-4 md:flex">
          <Skeleton className="size-7" />
          <Skeleton className="h-7 w-64" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 border" />
        <Skeleton className="size-9 border" />
      </div>
    </header>
  );
}
