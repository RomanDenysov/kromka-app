'use client';

import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { log } from '~/lib/utils/log';
import { authClient } from '~/server/auth/auth.client';

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/');
            router.refresh();
          },
        },
      });
    } catch (error) {
      log.error(error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon size={16} />
      Sign out
    </DropdownMenuItem>
  );
};

export { SignOutButton };
