import { memo, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Bell, ChevronsUpDown, UserCircle } from 'lucide-react';

import { LogoutButton } from '@/features/auth';
import { selectUnreadNotifications } from '@/entities/session';
import { useAppSelector } from '@/shared/config';
import { useRequiredUser } from '@/shared/model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';

import { UserInfo } from './UserInfo';
import { useSidebar } from '../model/useSidebar';
import { NotificationBadge } from './NotificationBadge';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './Sidebar';

type NavUserData = ReturnType<typeof useRequiredUser>;

export function NavUser() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useRequiredUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
          <NavUserTrigger user={user} menuOpen={menuOpen} />
          <NavUserMenuContent user={user} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

const NavUserTrigger = memo(function NavUserTrigger({
  user,
  menuOpen,
}: {
  user: NavUserData;
  menuOpen: boolean;
}) {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });
  const unreadNotifications = useAppSelector(selectUnreadNotifications);

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        aria-label={
          unreadNotifications > 0
            ? t('openUserMenuWithNotifications', { count: unreadNotifications })
            : undefined
        }
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground overflow-visible"
      >
        <UserInfo
          user={user}
          badge={
            !menuOpen && unreadNotifications > 0 ? (
              <NotificationBadge
                count={unreadNotifications}
                className="absolute -end-1 -top-1"
              />
            ) : null
          }
        />
        <NavUserChevron />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
});

const NavUserChevron = memo(function NavUserChevron() {
  const { open } = useSidebar();
  return open ? <ChevronsUpDown className="size-4" /> : null;
});

const NavUserMenuContent = memo(function NavUserMenuContent({
  user,
}: {
  user: NavUserData;
}) {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });
  const { isMobile, setOpenMobile } = useSidebar();

  return (
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
            <NavUserNotificationsBadge />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <LogoutButton />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
});

const NavUserNotificationsBadge = memo(function NavUserNotificationsBadge() {
  const unreadNotifications = useAppSelector(selectUnreadNotifications);
  return <NotificationBadge count={unreadNotifications} className="ms-auto" />;
});
