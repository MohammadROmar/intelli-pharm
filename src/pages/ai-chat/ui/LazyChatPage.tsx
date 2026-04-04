import { lazy } from 'react';

import { WithSuspense, Spinner } from '@/shared/ui/index.initial';

const ChatPage = lazy(() => import('./ChatPage'));

function ChatPageLoader() {
  return (
    <main className="grid h-full">
      <div className="text-skeleton flex size-full h-full items-center justify-center overflow-x-hidden">
        <Spinner className="size-12" />
      </div>
    </main>
  );
}

export function LazyChatPage() {
  return <WithSuspense Component={ChatPage} loader={<ChatPageLoader />} />;
}
