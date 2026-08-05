import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { ChatPageSkeleton } from './ChatLayoutSkeleton';

const ChatPage = lazy(() => import('./ChatPage'));

function LazyChatPage() {
  return (
    <WithSuspense loader={<ChatPageSkeleton />}>
      <ChatPage />
    </WithSuspense>
  );
}

export { LazyChatPage as Component };
