'use client'

import { CookieIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { isDevelopment } from '~/config/constants'
import { authClient } from '~/lib/auth-client'
import { log } from '~/lib/log'
import { cn } from '~/lib/utils'

export const CookieBanner = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hide, setHide] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { data: user, isPending } = authClient.useSession()

  if (isDevelopment) {
    log.debug(`USER, ${user}`, { timestamp: true, prefix: 'cookie banner' })
  }

  useEffect(() => {
    log.debug(`Effect triggered, ${isMounted}`)
    log.debug(`Current user: ${user}`)

    setIsMounted(true)

    if (!isPending) {
      if (user && !isPending) {
        log.debug('User exists, hiding banner')
        setHide(true)
        setIsOpen(false)
        return
      }

      log.debug('No user, showing banner')
      // Добавим небольшую задержку перед показом
      const timer = setTimeout(() => {
        setHide(false)
        setIsOpen(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [user, isMounted, isPending])

  if (!isMounted) {
    return null
  }

  const accept = async () => {
    setIsOpen(false)
    await authClient.signIn.anonymous()
    setTimeout(() => {
      setHide(true)
    }, 700)
  }

  const decline = () => {
    setIsOpen(false)
    setTimeout(() => {
      setHide(true)
    }, 700)
  }

  return (
    <Card
      className={cn(
        'fixed bottom-4 left-4 z-[200] max-w-xs space-y-0 shadow-2xl md:max-w-md',
        isOpen
          ? 'translate-y-0 opacity-100 transition-[opacity,transform]'
          : 'translate-y-8 opacity-0 transition-[opacity,transform]',
        hide && 'hidden',
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle>We use cookies</CardTitle>
        <CookieIcon />
      </CardHeader>
      <CardContent className="pb-3 md:pb-5">
        <p className="text-start font-normal text-xs md:text-sm">
          We use cookies to ensure you get the best experience on our website. For more information
          on how we use cookies, please see our cookie policy.
          <br />
          <br />
          <span className="text-xs">
            By clicking "<span className="font-medium opacity-80">Accept</span>
            ", you agree to our use of cookies.
          </span>
          <br />
          <Link href="#" className="text-xs underline">
            Learn more.
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 md:flex-row md:gap-4">
        <Button variant="outline" className="w-full" onClick={accept}>
          Accept
        </Button>
        <Button variant="secondary" className="w-full" onClick={decline}>
          Decline
        </Button>
      </CardFooter>
    </Card>
  )
}
