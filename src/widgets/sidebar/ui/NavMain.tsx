import { useTranslation } from 'react-i18next';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarMenuLink,
  useSidebar,
} from '@/shared/ui';
import type { NavSubItem, SidebarItem } from '@/shared/config';

type NavMainProps = { items: SidebarItem[] };

type NavItemContentProps = { icon?: LucideIcon; label: string };

function NavItemContent({ icon: Icon, label }: NavItemContentProps) {
  return (
    <>
      {Icon && <Icon className="size-4" />}
      <span className="truncate">{label}</span>
    </>
  );
}

type NavLinkItemProps = { item: SidebarItem | NavSubItem; label: string };

function NavLinkItem({ item, label }: NavLinkItemProps) {
  return (
    <SidebarMenuButton tooltip={label} asChild>
      <SidebarMenuLink to={item.url}>
        {'icon' in item ? (
          <NavItemContent icon={item.icon} label={label} />
        ) : (
          <span>{label}</span>
        )}
      </SidebarMenuLink>
    </SidebarMenuButton>
  );
}

export function NavMain({ items }: NavMainProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });
  const { isMobile, state, setOpen } = useSidebar();
  const { pathname } = useLocation();

  const handleTriggerClick = () => {
    if (!isMobile && state === 'collapsed') {
      setOpen(true);
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const label = t(item.label);
          const hasSubItems = Boolean(item.items?.length);
          const isChildActive = item.isActive || pathname.startsWith(item.url);

          const isDashboard = item.url === '/dashboard';

          const styles = isChildActive
            ? 'text-sidebar-accent-foreground font-medium'
            : undefined;

          if (!hasSubItems) {
            return (
              <SidebarMenuItem
                key={item.label}
                className={!isDashboard ? styles : undefined}
              >
                <NavLinkItem item={item} label={label} />
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.label}
              asChild
              defaultOpen={isChildActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={label}
                    onClick={handleTriggerClick}
                    className={styles}
                  >
                    <NavItemContent icon={item.icon} label={label} />
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:mr-auto rtl:ml-0 rtl:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.label}>
                        <NavLinkItem item={subItem} label={t(subItem.label)} />
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
