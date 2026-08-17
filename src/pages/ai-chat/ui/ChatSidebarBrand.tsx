import { useTranslation } from 'react-i18next';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/widgets/sidebar';
import { Logo } from '@/shared/ui';

export function ChatSidebarBrand() {
  const { t } = useTranslation('chat');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="pointer-events-none">
          <div className="bg-sidebar-primary flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
            <Logo className="size-4 text-white" aria-hidden />
          </div>
          <div className="grid flex-1 text-start leading-tight">
            <span translate="no" className="truncate font-medium">
              IntelliPharma
            </span>
            <span className="text-sidebar-foreground/70 truncate text-xs">
              {t('assistantLabel')}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
