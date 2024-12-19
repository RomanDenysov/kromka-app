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
