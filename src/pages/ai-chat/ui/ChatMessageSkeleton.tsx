import { Skeleton } from '@/shared/ui/index.initial';

import type { MessageRole } from '../model/chatTypes';

type ChatMessageSkeletonProps = {
  role: MessageRole;
};

export function ChatMessageSkeleton({ role }: ChatMessageSkeletonProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <Skeleton className="size-8 shrink-0 rounded-full!" />

      {isUser ? (
        <div className="flex w-2/3 max-w-sm flex-col items-end gap-2">
          <Skeleton className="h-14 w-full rounded-2xl! ltr:rounded-tr-sm! rtl:rounded-tl-sm!" />
          <Skeleton className="h-3 w-full max-w-12" />
        </div>
      ) : (
        <div className="w-full max-w-xl space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full max-w-5/6" />
          <Skeleton className="h-4 w-full max-w-2/3" />
          <Skeleton className="h-3 w-full max-w-12" />
        </div>
      )}
    </div>
  );
}
