import { lazy } from 'react';

import { ChatLayoutSkeleton } from '@/pages/ai-chat';
import { WithSuspense } from '@/shared/ui/index.initial';

const ChatLayout = lazy(() => import('../layouts/ChatLayout'));

export default function ChatRoute() {
  return (
    <WithSuspense Component={ChatLayout} loader={<ChatLayoutSkeleton />} />
  );
}
