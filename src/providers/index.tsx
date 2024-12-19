import type { ReactNode } from 'react'
import { CookieBanner } from '~/components/widgets/cookie-banner'

type Props = {
  readonly children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <>
      <CookieBanner />
      {children}
    </>
  )
}
