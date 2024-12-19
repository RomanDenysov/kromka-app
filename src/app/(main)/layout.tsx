import type { ReactNode } from 'react'
import Header from '~/components/widgets/header'

type Props = {
  readonly children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
