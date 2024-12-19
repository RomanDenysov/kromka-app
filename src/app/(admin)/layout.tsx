import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export default function Layout({ children }: Props) {
  return children
}
