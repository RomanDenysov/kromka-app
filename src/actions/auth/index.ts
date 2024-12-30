'use server'

import { redirect } from 'next/navigation'
import { authClient } from '~/lib/auth-client'

type Provider = 'google'

export async function signInWithProvider(provider: Provider) {
  await authClient.signIn.social(
    { provider: provider },
    {
      onSuccess: (ctx) => {
        console.log(ctx.data)
        redirect(ctx.data.url)
      },
    },
  )
}
export async function logout() {
  await authClient.signOut()
  console.log('logged out')
  const session = await authClient.getSession()
  console.log(session)
  return redirect('/')
}
