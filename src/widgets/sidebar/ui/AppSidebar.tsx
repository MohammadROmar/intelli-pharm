import { Link } from 'react-router-dom';
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
} from '@/shared/ui';
import { useTranslation } from 'react-i18next';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dir = useDirection();
  const isLtr = dir === 'ltr';

  return (
    <Sidebar side={isLtr ? 'left' : 'right'} collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarBrand() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'employeesPage.roles',
  });
  const roles = useAppSelector((state) => state.session.roles);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/dashboard">
            <div className="bg-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg">
              <Logo className="size-4 text-white" />
            </div>
            <div className="grid flex-1 text-sm leading-tight">
              <span className="truncate font-medium">IntelliPharm</span>
              <span className="text-sidebar-foreground/70 truncate text-xs">
                {roles ? t(roles[0]) : ''}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
