import { LockIcon, Settings2Icon, ShoppingBagIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { getUser, isAdmin } from '~/actions/user'
import { AvatarStack } from '~/components/avatar-stack'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { SignOutButton } from './sign-out-button'

const userButtonNavigation = [
  {
    title: 'Profile',
    href: '/',
    icon: UserIcon,
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: ShoppingBagIcon,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings2Icon,
  },
]

const UserButton = async () => {
  const user = await getUser()
  const admin = await isAdmin()

  if (!user) {
    return null
  }

  console.log('USER, user-button', user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-fit rounded-full focus:hidden">
        <AvatarStack avatar={user.image} name={user.name} email={user.email} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end" sideOffset={5}>
          <DropdownMenuGroup>
            {userButtonNavigation.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.href}>
                  <item.icon />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            {admin && <DropdownMenuSeparator />}
            {admin && (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <LockIcon />
                  Admin
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <Suspense>
              <SignOutButton />
            </Suspense>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export { UserButton }
