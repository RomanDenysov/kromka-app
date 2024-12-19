import type { ReactNode } from 'react'
import { Separator } from '~/components/ui/separator'
import { SidebarInset as RealSidebarInset, SidebarTrigger } from '~/components/ui/sidebar'

const SidebarInset = ({ children }: { children: ReactNode }) => {
  return (
    <RealSidebarInset>
      <header className="sticky inset-x-0 top-0 z-50 flex h-16 shrink-0 items-center gap-x-2 border-b bg-background px-4 shadow">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-6" />
      </header>
      <main className="mx-auto size-full bg-accent">{children}</main>
    </RealSidebarInset>
  )
}

export { SidebarInset }
