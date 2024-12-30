import type { ReactNode } from 'react'
import Footer from '~/components/widgets/footer'
import Header from '~/components/widgets/header'

type Props = {
  readonly children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
