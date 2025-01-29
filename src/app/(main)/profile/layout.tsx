import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { api } from '~/trpc/server';

type Props = {
  readonly children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await api.auth.getUser();

  if (!user || user.isAnonymous) {
    redirect('/');
  }

  return children;
}
