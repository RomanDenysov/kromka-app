'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from '~/components/ui/dropdown-menu'
import { authClient } from '~/lib/auth-client'

const SignOutButton = () => {
  const router = useRouter()
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/')
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon size={16} />
      Sign out
    </DropdownMenuItem>
  )
}

export { SignOutButton }
