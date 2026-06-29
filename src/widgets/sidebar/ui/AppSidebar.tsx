import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@radix-ui/react-direction';

import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import { sidebarData, useAppSelector } from '@/shared/config';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  Logo,
  useSidebar,
} from '@/shared/ui';

const handleWheel = (e: React.WheelEvent) => e.stopPropagation();

const logoIcon = (
  <div className="bg-sidebar-primary flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
    <Logo className="size-4 text-white" />
  </div>
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dir = useDirection();
  const isLtr = dir === 'ltr';

  return (
    <Sidebar side={isLtr ? 'left' : 'right'} collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent onWheel={handleWheel} className="thin-scrollbar">
        <NavMain sections={sidebarData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="hidden! md:block!" />
    </Sidebar>
  );
}

const SidebarBrand = memo(function SidebarBrand() {
  const { t } = useTranslation('common', { keyPrefix: 'roles' });
  const roles = useAppSelector((state) => state.session.roles);

  const { setOpenMobile } = useSidebar();

  const handleClick = useCallback(() => setOpenMobile(false), [setOpenMobile]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/dashboard" onClick={handleClick}>
            {logoIcon}
            <div className="grid flex-1 text-sm leading-tight">
              <span className="truncate font-medium">IntelliPharma</span>
              <span className="text-sidebar-foreground/70 truncate text-xs">
                {roles?.[0] ? t(roles[0]) : ''}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});
