import { ReactNode } from 'react'
import { cn } from '~/lib/utils'

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('container relative mx-auto px-4 lg:px-8', className)}>{children}</div>
}

export { Container }
