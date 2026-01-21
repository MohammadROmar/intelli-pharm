import { Outlet, useLocation } from 'react-router-dom';

import { ModeToggle } from '../components/ModeToggle';
import { AppSidebar } from '@/shared/components/AppSidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/components/ui/breadcrumb';
import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
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
            <ModeToggle />
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

  const segments = pathname.split('/').filter(Boolean);

  return (
    <>
      {segments.map((segment, i) => {
        const href = `/${segments.slice(0, i + 1).join('/')}`;

        return (
          <BreadcrumbItem key={href} className="hidden md:block">
            {i === segments.length - 1 ? (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </>
  );
}
