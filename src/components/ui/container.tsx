import { ReactNode } from 'react'
import { cn } from '~/lib/utils'

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('container relative size-full max-w-7xl mx-auto px-4 lg:px-8', className)}>
      {children}
    </div>
  )
}

export { Container }
