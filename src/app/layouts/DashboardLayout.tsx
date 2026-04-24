import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SidebarProvider from '../providers/SidebarProvider';
import { AppSidebar } from '@/widgets/sidebar';
import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleToggle } from '@/features/locale-toggle';
import {
  BreadCrumbs,
  Separator,
  SidebarInset,
  SidebarTrigger,
} from '@/shared/ui';

export default function DashboardLayout() {
  const { t } = useTranslation();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b md:bg-none">
          <div className="flex w-full items-center justify-between gap-4 px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger srLabel={t('sidebar.toggle')} />
              <Separator
                orientation="vertical"
                className="md:h-4! ltr:mr-2 rtl:ml-2"
              />

              <BreadCrumbs className="hidden md:block" />
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LocaleToggle />
            </div>
          </div>
        </header>

        <div className="m-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4">
          <BreadCrumbs className="md:hidden" />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
