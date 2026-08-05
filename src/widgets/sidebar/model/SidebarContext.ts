import { createContext } from 'react';

export type SidebarStateContextProps = {
  state: 'expanded' | 'collapsed';
  isMobile: boolean;
};

export type SidebarMobileContextProps = {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
};

export type SidebarActionsContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

export type SidebarContextProps = SidebarStateContextProps &
  SidebarMobileContextProps &
  SidebarActionsContextProps;

export const SidebarStateContext =
  createContext<SidebarStateContextProps | null>(null);

export const SidebarMobileContext =
  createContext<SidebarMobileContextProps | null>(null);

export const SidebarActionsContext =
  createContext<SidebarActionsContextProps | null>(null);

export const SidebarContext = createContext<SidebarContextProps | null>(null);
