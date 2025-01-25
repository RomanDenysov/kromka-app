'use client'

import { XIcon, ZoomInIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoadingSpinner } from '~/components/loading-spinner'
import { Typography } from '~/components/typography'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { ScrollArea } from '~/components/ui/scroll-area'
import { useConfirm } from '~/hooks/use-confirm'
import { api } from '~/trpc/react'

export const MediaList = () => {
  const { data: images, refetch } = api.images.getAll.useQuery()
  const confirm = useConfirm()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<NonNullable<typeof images>[number] | null>(
    null,
  )
  const deleteMutation = api.images.delete.useMutation({
    onSuccess: () => {
      router.refresh()
      refetch()
    },
  })

  const handleDelete = async (imageId: string) => {
    const isConfirmed = await confirm({
      title: 'Подтвердите удаление',
      message: 'Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.',
      confirmText: 'Да, удалить',
      cancelText: 'Отмена',
    })

    if (isConfirmed) {
      await deleteMutation.mutateAsync({ id: imageId })
    }
  }

  if (!images) {
    return (
      <center className="grid h-full place-content-center">
        <LoadingSpinner size="lg" />
      </center>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <Typography variant="h3">Media ({images.length})</Typography>
      <ScrollArea className="flex-1 pr-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {/* {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"> */}
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square size-full overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/90 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(image)
                    }}
                  >
                    <ZoomInIcon size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-white hover:bg-white/90 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation()
                      image.id && handleDelete(image.id)
                    }}
                  >
                    <XIcon size={16} />
                  </Button>
                </div>
                <div className="absolute right-2 bottom-2 left-2">
                  <p className="truncate text-sm text-white">{image.name}</p>
                  <p className="text-white/80 text-xs">{image.size}</p>
                </div>
              </div>
            </div>
          ))}

          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedImage?.name}</DialogTitle>
                {selectedImage?.size && (
                  <DialogDescription>{selectedImage?.size}</DialogDescription>
                )}
              </DialogHeader>
              <div className="relative aspect-video">
                {selectedImage && (
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    fill
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ScrollArea>
    </div>
  )
}
