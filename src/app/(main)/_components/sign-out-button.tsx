'use client'

import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'
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
  return <Button onClick={handleSignOut}>Sign Out</Button>
}

export default SignOutButton
