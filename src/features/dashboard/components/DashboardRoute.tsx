import SidebarProvider from '@/shared/context/Sidebar';
import DashboardLayout from '@/shared/layouts/Dashboard';

export default function DashboardRoute() {
  return (
    <SidebarProvider>
      <DashboardLayout />
    </SidebarProvider>
  );
}
