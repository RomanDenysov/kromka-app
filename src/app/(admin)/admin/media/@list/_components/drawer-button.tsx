'use client';

import { useUploadDrawer } from '~/components/features/upload-drawer/hooks/use-upload-drawer';
import { Button } from '~/components/ui/button';

export const DrawerButton = () => {
  const onOpen = useUploadDrawer((state) => state.onOpen);

  return <Button onClick={onOpen}>Upload</Button>;
};
