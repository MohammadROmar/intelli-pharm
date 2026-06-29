import { lazy } from 'react';

import { ChatLayoutSkeleton } from '@/pages/ai-chat';
import { WithSuspense } from '@/shared/ui/index.initial';

const ChatLayout = lazy(() => import('../../../layouts/ChatLayout'));

export function ChatRoute() {
  return (
    <WithSuspense loader={<ChatLayoutSkeleton />}>
      <ChatLayout />
    </WithSuspense>
  );
}
