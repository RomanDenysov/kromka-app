import Image from 'next/image'
import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="relative flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-muted md:bg-transparent">
        {children}
      </div>
      <div className="relative hidden aspect-auto flex-1 md:block">
        <Image
          loading="eager"
          decoding="sync"
          priority={true}
          alt="login screen"
          src="/placeholder.png"
          fill
          className="object-cover object-center"
        />
      </div>
    </main>
  )
}
