import { ChatMessageSkeleton } from './ChatMessageSkeleton';
import { Skeleton } from '@/shared/ui/index.initial';

const PAGE_SKELETON_ROLES = ['user', 'model', 'user', 'model'] as const;
const HISTORY_GROUPS = [0, 1, 2] as const;
const HISTORY_ITEMS = [0, 1, 2] as const;

function HistorySidebarSkeleton() {
  return (
    <aside className="bg-sidebar border-sidebar-border hidden w-full max-w-64 shrink-0 flex-col border-e md:flex">
      <div className="flex h-16 items-center gap-2 p-2">
        <Skeleton className="size-8 rounded-lg!" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-full max-w-24" />
          <Skeleton className="h-3 w-full max-w-16" />
        </div>
      </div>
      <div className="px-2 pb-2">
        <Skeleton className="h-10 w-full rounded-lg!" />
      </div>
      <div className="px-3 pb-2">
        <Skeleton className="h-10 w-full rounded-lg!" />
      </div>
      <div className="flex-1 space-y-5 overflow-hidden px-2 py-2">
        {HISTORY_GROUPS.map((group) => (
          <div key={group} className="space-y-1.5">
            <Skeleton className="ms-2 h-3 w-full max-w-16" />
            {HISTORY_ITEMS.map((item) => (
              <div key={item} className="flex h-8 items-center gap-2 px-2">
                <Skeleton className="size-4 rounded-md!" />
                <Skeleton
                  className={
                    item === 1
                      ? 'h-3.5 w-full max-w-3/5'
                      : 'h-3.5 w-full max-w-4/5'
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="p-2">
        <Skeleton className="h-8 w-full rounded-lg!" />
      </div>
    </aside>
  );
}

function ChatHeaderSkeleton() {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-3">
      <Skeleton className="size-9 rounded-lg!" />
      <Skeleton className="h-4 w-px shrink-0 rounded-none!" />
      <Skeleton className="h-3.5 w-full max-w-32" />
    </div>
  );
}

export function ChatPageSkeleton() {
  return (
    <div className="relative flex size-full min-h-0 overflow-hidden">
      <HistorySidebarSkeleton />

      <div className="grid min-w-0 flex-1 grid-rows-[auto_1fr_auto] overflow-hidden">
        <ChatHeaderSkeleton />

        <div className="mx-auto w-full max-w-3xl space-y-7 overflow-hidden px-4 pt-8 pb-8 sm:px-6">
          {PAGE_SKELETON_ROLES.map((role, index) => (
            <ChatMessageSkeleton key={`${role}-${index}`} role={role} />
          ))}
        </div>

        <div className="bg-background/80 flex flex-col items-center justify-center px-3 pt-3 pb-3 sm:px-4 sm:pt-4">
          <div className="bg-card border-input flex h-15.5 w-full max-w-3xl items-center gap-2 rounded-3xl border p-2">
            <Skeleton className="h-11 w-full rounded-xl!" />
            <Skeleton className="aspect-square size-10 rounded-full!" />
          </div>
          <Skeleton className="mt-2 h-3 w-full max-w-40" />
        </div>
      </div>
    </div>
  );
}

export function ChatLayoutSkeleton() {
  return (
    <div className="h-dvh min-h-0 w-full overflow-hidden">
      <ChatPageSkeleton />
    </div>
  );
}
