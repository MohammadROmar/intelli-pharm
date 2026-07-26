import { useTranslation } from 'react-i18next';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuLink,
  useSidebar,
} from '@/shared/ui';

import type { NavSection, SidebarItem } from '../config/sidebarData';

type NavMainProps = { sections: NavSection[] };

type TFunction = (key: string) => string;

type NavItemContentProps = { icon?: LucideIcon; label: string };

function NavItemContent({ icon: Icon, label }: NavItemContentProps) {
  return (
    <>
      {Icon && <Icon className="size-4" />}
      <span className="truncate">{label}</span>
    </>
  );
}

type NavMenuItemProps = { item: SidebarItem; t: TFunction };

function NavMenuItem({ item, t }: NavMenuItemProps) {
  const { isMobile, state, setOpen } = useSidebar();
  const { pathname } = useLocation();

  const label = t(item.label);
  const hasSubItems = Boolean(item.items?.length);

  const isAncestorActive = item.exact
    ? pathname === item.url
    : pathname === item.url || pathname.startsWith(item.url + '/');

  const ancestorClass = isAncestorActive
    ? 'text-sidebar-accent-foreground font-medium'
    : undefined;

  if (!hasSubItems) {
    return (
      <SidebarMenuItem className={ancestorClass}>
        <SidebarMenuLink
          label={label}
          to={item.url}
          exact={item.exact ?? false}
        >
          <NavItemContent icon={item.icon} label={label} />
        </SidebarMenuLink>
      </SidebarMenuItem>
    );
  }

  const handleTriggerClick = () => {
    if (!isMobile && state === 'collapsed') setOpen(true);
  };

  return (
    <Collapsible
      asChild
      defaultOpen={isAncestorActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={label}
            onClick={handleTriggerClick}
            className={ancestorClass}
          >
            <NavItemContent icon={item.icon} label={label} />
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:mr-auto rtl:ml-0 rtl:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const subLabel = t(subItem.label);
              return (
                <SidebarMenuSubItem key={subItem.label}>
                  <SidebarMenuLink label={subLabel} to={subItem.url}>
                    <span>{subLabel}</span>
                  </SidebarMenuLink>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function NavMain({ sections }: NavMainProps) {
  const { t } = useTranslation('layout', { keyPrefix: 'sidebar' });

  return (
    <>
      {sections.map((section, index) => (
        <SidebarGroup key={section.sectionLabel ?? `section-${index}`}>
          {section.sectionLabel && (
            <SidebarGroupLabel>{t(section.sectionLabel)}</SidebarGroupLabel>
          )}
          <SidebarMenu>
            {section.items.map((item) => (
              <NavMenuItem key={item.label} item={item} t={t} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
