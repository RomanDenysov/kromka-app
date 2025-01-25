import type { ReactNode } from 'react'
import { Container } from '~/components/ui/container'

type Props = {
  readonly children: ReactNode
  readonly upload: ReactNode
  readonly list: ReactNode
}

export default function Layout({ children, upload, list }: Props) {
  return (
    <Container className="relative flex h-[calc(100vh-80px)] flex-col gap-4 py-4 md:py-8">
      <div className="">{upload}</div>
      <div className="flex-1 overflow-hidden">{list}</div>
    </Container>
  )
}
