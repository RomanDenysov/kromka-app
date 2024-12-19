import type { ReactNode } from 'react'
import { DashboardSidebar } from '~/components/widgets/dashboard-sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardSidebar>{children}</DashboardSidebar>
}
