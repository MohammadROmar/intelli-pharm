import { Outlet, useLocation } from 'react-router';

import { ErrorBoundary } from '@/shared/lib';
import { PageErrorFallback } from '@/shared/ui';

import SidebarProvider from '../providers/SidebarProvider';

export default function ChatLayout() {
  const { pathname } = useLocation();

  return (
    <div className="h-dvh min-h-0 overflow-hidden">
      <ErrorBoundary
        FallbackComponent={PageErrorFallback}
        resetKeys={[pathname]}
      >
        <SidebarProvider className="h-full min-h-0">
          <Outlet />
        </SidebarProvider>
      </ErrorBoundary>
    </div>
  );
}
