import { lazy } from 'react';

import { WithSuspense } from '@/shared/ui/index.initial';
import { ChatPageSkeleton } from './ChatLayoutSkeleton';

const ChatPage = lazy(() => import('./ChatPage'));

export function LazyChatPage() {
  return <WithSuspense Component={ChatPage} loader={<ChatPageSkeleton />} />;
}
