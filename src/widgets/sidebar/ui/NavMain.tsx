import { useTranslation } from 'react-i18next';
import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarLink,
} from '@/shared/ui';

type SidebarItem = {
  key: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    key: string;
    url: string;
  }[];
};
type RenderItemProps = { icon: SidebarItem['icon']; label: string };

export function NavMain({ items }: { items: SidebarItem[] }) {
  const { t } = useTranslation('translation', { keyPrefix: 'sidebar' });

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.key}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={t(item.key)} asChild={!item.items}>
                  {item.items ? (
                    <>
                      <SidebarRenderItem icon={item.icon} label={t(item.key)} />
                      <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 ltr:ml-auto rtl:mr-auto" />
                    </>
                  ) : (
                    <SidebarLink to={item.url}>
                      <SidebarRenderItem icon={item.icon} label={t(item.key)} />
                    </SidebarLink>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.key}>
                      <SidebarMenuSubButton asChild>
                        <SidebarLink to={subItem.url}>
                          <span>{t(subItem.key)}</span>
                        </SidebarLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarRenderItem({ icon: Icon, label }: RenderItemProps) {
  return (
    <>
      {Icon && <Icon />}
      <span>{label}</span>
    </>
  );
}
