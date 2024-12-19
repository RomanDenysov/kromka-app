import Link from 'next/link'
import { Icons } from '~/components/icons'
import { buttonVariants } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { cn } from '~/lib/utils'
import { UserButton } from '../user-button'
import DesktopNav from './desktop-nav'
import MobileNav from './mobile-nav'

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-40 w-full bg-background">
      <Container className="relative flex min-h-16 flex-row items-center gap-4 border-b lg:grid lg:grid-cols-3">
        <DesktopNav />
        <div className="flex w-12 shrink items-end justify-end lg:hidden">
          <MobileNav />
        </div>
        <div className="flex lg:justify-center">
          <Icons.kromka className="h-5 lg:h-7" />
        </div>
        <div className="flex w-full items-center justify-end gap-3">
          <Link href="/sign-in" className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}>
            Sign in
          </Link>
          <UserButton />
        </div>
      </Container>
    </header>
  )
}

export default Header
