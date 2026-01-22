import clsx from 'clsx';

import { SIDEBAR_WIDTH } from '@/shared/context/Sidebar/constants';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { buttonVariants } from '@/shared/components/ui/button-variants';

export default function DashboardLoader() {
  return (
    <div
      className="grid h-dvh w-screen grid-cols-1 overflow-hidden md:grid-cols-[16rem_1fr]"
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
        } as React.CSSProperties
      }
    >
      <SidebarLoader />
      <div className="relative grid grid-rows-[auto_1fr]">
        <HeaderLoader />
        <main className="size-full">
          <MainLoader />
        </main>
      </div>
    </div>
  );
}

function SidebarLoader() {
  return (
    <aside className="hidden size-full md:block">
      <Skeleton className="size-full rounded-none" />
    </aside>
  );
}

function HeaderLoader() {
  const BUTTON_SKELETON = buttonVariants({
    size: 'icon',
    variant: 'outline',
    className: 'transition-none',
  });

  return (
    <header className="flex h-16 items-center justify-between border-b p-4 px-3">
      <div className="h-full">
        <Skeleton className={clsx(BUTTON_SKELETON, 'md:hidden')} />
        <div className="hidden h-full w-fit items-center gap-4 md:flex">
          <Skeleton className="size-7" />
          <Skeleton className="h-7 w-64" />
        </div>
      </div>
      <div className="space-x-3">
        <Skeleton className={BUTTON_SKELETON} />
        <Skeleton className={BUTTON_SKELETON} />
      </div>
    </header>
  );
}

function MainLoader() {
  return (
    <div className="grid size-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton
          key={i}
          className="size-full"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
