import { useContext } from 'react';

import {
  SidebarActionsContext,
  SidebarContext,
  SidebarMobileContext,
  SidebarStateContext,
  type SidebarActionsContextProps,
  type SidebarContextProps,
  type SidebarMobileContextProps,
  type SidebarStateContextProps,
} from './SidebarContext';

export function useSidebar(): SidebarContextProps {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

export function useSidebarState(): SidebarStateContextProps {
  const context = useContext(SidebarStateContext);

  if (!context) {
    throw new Error('useSidebarState must be used within a SidebarProvider.');
  }

  return context;
}

export function useSidebarMobile(): SidebarMobileContextProps {
  const context = useContext(SidebarMobileContext);

  if (!context) {
    throw new Error('useSidebarMobile must be used within a SidebarProvider.');
  }

  return context;
}

export function useSidebarActions(): SidebarActionsContextProps {
  const context = useContext(SidebarActionsContext);

  if (!context) {
    throw new Error('useSidebarActions must be used within a SidebarProvider.');
  }

  return context;
}
