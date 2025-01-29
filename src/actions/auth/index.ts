'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { log } from '~/lib/utils/log';
import { auth } from '~/server/auth/auth';
import { authClient } from '~/server/auth/auth.client';
import { db } from '~/server/db';
import { staff } from '~/server/db/schema';

type Provider = 'google';

async function signInWithProvider(provider: Provider) {
  await authClient.signIn.social(
    { provider: provider },
    {
      onSuccess: (ctx) => {
        log.info(ctx.data);
        redirect(ctx.data.url);
      },
    }
  );
}

async function logout() {
  await authClient.signOut();
  log.info('logged out');
  const session = await authClient.getSession();
  log.info(session);
  return redirect('/');
}

const checkAccess = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  log.info(session);

  if (!session || session.user.isAnonymous) {
    return false;
  }

  const staffMember = await db.query.staff.findFirst({
    where: eq(staff.userId, session.user.id),
  });

  if (!staffMember) {
    return false;
  }

  return true;
});

export { checkAccess, logout, signInWithProvider };
