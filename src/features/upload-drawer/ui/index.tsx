'use client'

import { Button } from '~/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer'
import { Upload } from '~/components/widgets/upload'
import { useUploadDrawer } from '../hooks/use-upload-drawer'

export const UploadDrawer = () => {
  const isOpen = useUploadDrawer((state) => state.isOpen)
  const onClose = useUploadDrawer((state) => state.onClose)

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg md:max-w-2xl">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Upload />
          </div>
          <DrawerFooter className="w-full flex-row justify-center">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
            <Button className="w-full">Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
