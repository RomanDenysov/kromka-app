import { redirect } from 'next/navigation';

import { api } from '~/trpc/server';
import { GetPermissionDialog } from './_components/get-permission-dialog';

export default async function Page() {
  const hasAccess = await api.auth.checkAccess();

  if (!hasAccess.success) {
    return <GetPermissionDialog />;
  }
  redirect('/profile');
}
