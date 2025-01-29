import {
  LockIcon,
  Settings2Icon,
  ShoppingBagIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { AvatarStack } from '~/components/avatar-stack';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { log } from '~/lib/utils/log';
import { api } from '~/trpc/server';
import { SignOutButton } from './sign-out-button';

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
];

const UserButton = async () => {
  const [user, hasAccess] = await Promise.all([
    api.users.getUser(),
    api.users.checkAccess(),
  ]);
  if (!user || user.isAnonymous) {
    return null;
  }

  log.info('USER', user);
  log.info('hasAccess', hasAccess);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-fit rounded-full focus:hidden">
        <Suspense>
          <AvatarStack
            avatar={user.image}
            name={user.name}
            email={user.email}
          />
        </Suspense>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end" sideOffset={5}>
          <DropdownMenuGroup>
            {userButtonNavigation.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={`/profile/${item.href}`}>
                  <item.icon />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            {hasAccess.success && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <LockIcon />
                    Admin
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <Suspense>
              <SignOutButton />
            </Suspense>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export { UserButton };
