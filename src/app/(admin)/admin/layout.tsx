import type { ReactNode } from 'react'
import { DashboardSidebar } from '~/components/widgets/dashboard-sidebar'
import { UploadDrawer } from '~/features/upload-drawer/ui'

type Props = {
  readonly children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <DashboardSidebar>
      <UploadDrawer />
      {children}
    </DashboardSidebar>
  )
}
