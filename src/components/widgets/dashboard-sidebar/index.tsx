import { SidebarProvider } from '~/components/ui/sidebar'
import { AdminSidebar } from './admin-sidebar'
import { SidebarInset } from './sidebar-inset'
import type { ReactNode } from 'react'

const DashboardSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export { DashboardSidebar }
