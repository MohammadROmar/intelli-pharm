import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell, ChevronsUpDown, UserCircle } from 'lucide-react';

import { LogoutButton } from '@/features/auth';
import { useAppSelector } from '@/shared/config';
import { useRequiredUser } from '@/shared/model';
import {
  useSidebar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui';

import { UserInfo } from './UserInfo';
import { NotificationBadge } from './NotificationBadge';

export function NavUser() {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });
  const { isMobile, setOpenMobile } = useSidebar();

  const user = useRequiredUser();
  const unreadNotifications = useAppSelector(
    (state) => state.session.unreadNotifications ?? 0,
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label={
                unreadNotifications > 0
                  ? t('openUserMenuWithNotifications', {
                      count: unreadNotifications,
                    })
                  : undefined
              }
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserInfo
                user={user}
                badge={
                  <NotificationBadge
                    count={unreadNotifications}
                    className="absolute -end-1 -top-1"
                  />
                }
              />
              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                <UserInfo user={user} />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircle />
                {t('account')}
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="notifications" onClick={() => setOpenMobile(false)}>
                  <Bell />
                  {t('notifications')}

                  <NotificationBadge
                    count={unreadNotifications}
                    className="ms-auto"
                  />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
