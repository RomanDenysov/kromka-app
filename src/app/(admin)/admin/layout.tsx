import type { ReactNode } from 'react'
import { DashboardSidebar } from '~/components/widgets/dashboard-sidebar'
import { UploadDrawer } from '~/features/upload-drawer/ui'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DashboardSidebar>
      <UploadDrawer />
      {children}
    </DashboardSidebar>
  )
}
