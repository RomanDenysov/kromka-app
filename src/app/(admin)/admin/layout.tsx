import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { UploadDrawer } from '~/components/features/upload-drawer/ui';
import { DashboardSidebar } from '~/components/widgets/dashboard-sidebar';
import { api } from '~/trpc/server';

type Props = {
  readonly children: ReactNode;
};

export default async function Layout({ children }: Props) {
  const { success } = await api.auth.checkAccess();

  if (!success) {
    return notFound();
  }

  return (
    <DashboardSidebar>
      <UploadDrawer />
      {children}
    </DashboardSidebar>
  );
}
