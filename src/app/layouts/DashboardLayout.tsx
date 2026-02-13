import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ThemeToggle } from '@/features/theme-toggle';
import { LocaleToggle } from '@/features/locale-toggle';
import { AppSidebar } from '@/widgets/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Separator,
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from '@/shared/ui';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b md:bg-none">
          <div className="flex w-full items-center justify-between gap-4 px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadCrumbsItems />
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LocaleToggle />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function BreadCrumbsItems() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <>
      {segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join('/')}`;

        return (
          <BreadcrumbItem key={href} className="hidden md:block">
            {i === segments.length - 1 ? (
              <BreadcrumbPage>{t(`navigation.${segment}`)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </>
  );
}
