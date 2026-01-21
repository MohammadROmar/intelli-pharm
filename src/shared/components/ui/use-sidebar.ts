import { useContext } from 'react';

import { SidebarContext } from '@/shared/context/Sidebar/context';

export default function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}
