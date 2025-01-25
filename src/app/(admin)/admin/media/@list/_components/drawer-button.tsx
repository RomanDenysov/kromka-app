'use client'

import { Button } from '~/components/ui/button'
import { useUploadDrawer } from '~/features/upload-drawer/hooks/use-upload-drawer'

export const DrawerButton = () => {
  const onOpen = useUploadDrawer((state) => state.onOpen)

  return <Button onClick={onOpen}>Upload</Button>
}
