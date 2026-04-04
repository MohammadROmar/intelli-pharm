import { lazy } from 'react';

import DashboardSkeleton from './DashboardLayoutSkeleton';
import { ChatLayoutSkeleton } from '@/pages/ai-chat';
import { LoginSkeleton } from '@/pages/login';
import { useAppSelector } from '@/shared/config';
import { WithSuspense } from '@/shared/ui/index.initial';

const RootLayout = lazy(() => import('./RootLayout'));

export function LazyRootLayout() {
  const { refreshToken } = useAppSelector((state) => state.session);

  const isChat = window.location.pathname.startsWith('/chat');
  const AuthSkeleton = isChat ? ChatLayoutSkeleton : DashboardSkeleton;

  return (
    <WithSuspense
      Component={RootLayout}
      loader={refreshToken ? <AuthSkeleton /> : <LoginSkeleton />}
    />
  );
}
