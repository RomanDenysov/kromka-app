import type { ReactNode } from 'react';
import { SidebarProvider } from '~/components/ui/sidebar';
import { AdminSidebar } from './admin-sidebar';
import { SidebarInset } from './sidebar-inset';

const DashboardSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export { DashboardSidebar };
