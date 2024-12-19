import type { ReactNode } from 'react'
import { Container } from '~/components/ui/container'

export default function Layout({ children }: { children: ReactNode }) {
  return <Container className="py-4 md:py-8">{children}</Container>
}
