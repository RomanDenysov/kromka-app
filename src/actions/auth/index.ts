'use server'

import { redirect } from 'next/navigation'
import { authClient } from '~/lib/auth-client'
import { log } from '~/lib/utils/log'

type Provider = 'google'

export async function signInWithProvider(provider: Provider) {
  await authClient.signIn.social(
    { provider: provider },
    {
      onSuccess: (ctx) => {
        log.info(ctx.data)
        redirect(ctx.data.url)
      },
    },
  )
}
export async function logout() {
  await authClient.signOut()
  log.info('logged out')
  const session = await authClient.getSession()
  log.info(session)
  return redirect('/')
}
