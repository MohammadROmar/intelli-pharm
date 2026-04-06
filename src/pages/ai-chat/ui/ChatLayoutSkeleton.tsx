import { Separator, Skeleton } from '@/shared/ui/index.initial';

function MessageSkeleton({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`flex items-end gap-2.5 ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Skeleton className="size-8 rounded-full!" />
      <div
        className={`flex w-full max-w-[75%] flex-col gap-1 ${reverse ? 'items-end' : 'items-start'}`}
      >
        <Skeleton
          className={`h-11 w-full rounded-2xl! ${
            reverse
              ? 'ltr:rounded-br-sm! rtl:rounded-bl-sm!'
              : 'ltr:rounded-bl-sm! rtl:rounded-br-sm!'
          }`}
        />

        <Skeleton className="h-4 w-9" />
      </div>
    </div>
  );
}

export function ChatLayoutSkeleton() {
  return (
    <div className="flex h-svh flex-col">
      <header className="bg-background/80 supports-backdrop-filter:bg-background/60 shrink-0 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Skeleton className="size-7 sm:w-24" />
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <Skeleton className="size-7" />
            <Skeleton className="h-5 w-22" />
          </div>
        </div>
        <Separator />
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1">
        <div className="space-y-4 overflow-y-hidden px-4 py-6">
          <MessageSkeleton />
          <MessageSkeleton reverse />
          <MessageSkeleton />
          <MessageSkeleton reverse />
        </div>
      </main>

      <footer className="bg-background/80 border-border flex flex-col items-center justify-center border-t p-4">
        <div className="bg-muted/50 flex h-15.5 w-full max-w-3xl items-center gap-2 rounded-3xl p-2">
          <Skeleton className="h-11 w-full rounded-xl!" />
          <Skeleton className="aspect-square size-9 rounded-full!" />
        </div>
        <Skeleton className="mt-3 h-4 w-32" />
      </footer>
    </div>
  );
}
