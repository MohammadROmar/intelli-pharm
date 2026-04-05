import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { ChatLayoutSkeleton } from './ChatLayoutSkeleton';

const ChatPage = lazy(() => import('./ChatPage'));

export function LazyChatPage() {
  return <WithSuspense Component={ChatPage} loader={<ChatLayoutSkeleton />} />;
}
