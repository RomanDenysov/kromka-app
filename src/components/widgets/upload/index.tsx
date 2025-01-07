'use client'

import { ImageIcon, Loader2, MousePointerSquareDashed, XIcon, ZoomInIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Dropzone, { type FileRejection } from 'react-dropzone'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Progress } from '~/components/ui/progress'
import { toast } from '~/hooks/use-toast'
import { useUpload } from '~/lib/upload/hooks'
import { formatFileSize } from '~/lib/upload/utils'
import { cn } from '~/lib/utils'

interface UploadedImage {
  url: string
  id?: string
  name: string
  size: string
}

export const Upload = ({
  className,
  maxFiles = 9,
  onUploadComplete,
}: {
  className?: string
  maxFiles?: number
  onUploadComplete?: (fileUrl: string) => void
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)

  const { startUpload, isUploading } = useUpload('image', {
    onUploadBegin: () => {
      setUploadProgress(0)
    },
    onUploadComplete: (files) => {
      if (uploadedImages.length + files.length > maxFiles) {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: `You can only upload up to ${maxFiles} files`,
        })
        return
      }

      const newImages = files.map((file) => ({
        url: file.url,
        id: file.key,
        name: file.name,
        size: formatFileSize(Number.parseInt(file.size, 10)),
      }))

      setUploadedImages((prev) => [...prev, ...newImages])

      if (files[0] && onUploadComplete) {
        onUploadComplete(files[0].url)
      }
      toast({
        title: 'Upload successful',
        description: 'Your file has been uploaded',
      })
    },
    onUploadError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message,
      })
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles

    toast({
      variant: 'destructive',
      title: 'Upload failed',
      description: `${file.file.type} type is not supported`,
    })
    setIsDragOver(false)
  }

  const onDropAccepted = async (acceptedFiles: File[]) => {
    if (uploadedImages.length + acceptedFiles.length > maxFiles) {
      toast({
        variant: 'destructive',
        title: 'Upload limit exceeded',
        description: `Maximum ${maxFiles} files allowed`,
      })
      return
    }
    setIsDragOver(false)
    await startUpload(acceptedFiles)
  }

  const handleDelete = async (imageId: string) => {
    try {
      // await trpc.images.delete.mutate({ id: imageId })
      setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
      toast({
        title: 'Image deleted',
        description: 'Image was successfully removed',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Delete failed',
        description: 'Failed to delete image',
      })
    }
  }

  const getUploadZoneContent = () => {
    if (isUploading) {
      return (
        <div className="text-center">
          <Loader2 size={24} className="mx-auto mb-2 animate-spin text-zinc-500" />
          <p>Uploading...</p>
          <Progress className="mx-auto mt-2 h-2 w-40 bg-muted" value={uploadProgress} />
        </div>
      )
    }

    if (isDragOver) {
      return (
        <div className="text-center">
          <MousePointerSquareDashed size={24} className="mx-auto mb-2 text-zinc-500" />
          <p>
            <span className="font-semibold">Drop files</span> here to upload
          </p>
        </div>
      )
    }
    return (
      <div className="text-center">
        <ImageIcon size={24} className="mx-auto mb-2 text-zinc-500" />
        <p>Drag and drop files here, or click to select</p>
        <p className="mt-2 text-muted-foreground text-xs">PNG, JPG, JPEG, WEBP</p>
        <p className="text-muted-foreground text-xs">Max {maxFiles} files</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 lg:gap-8 ">
      <Dropzone
        onDropRejected={onDropRejected}
        onDropAccepted={onDropAccepted}
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg'],
          'image/jpg': ['.jpg'],
          'image/webp': ['.webp'],
        }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        maxFiles={maxFiles}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={cn(
              'col-span-3 flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-border border-dashed p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary',
              className,
            )}
          >
            <input {...getInputProps()} />
            {getUploadZoneContent()}
          </div>
        )}
      </Dropzone>

      {/* {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"> */}
      {uploadedImages.map((image) => (
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
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(image)
                }}
              >
                <ZoomInIcon className="h-4 w-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  image.id && handleDelete(image.id)
                }}
              >
                <XIcon className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="absolute right-2 bottom-2 left-2">
              <p className="truncate text-sm text-white">{image.name}</p>
              <p className="text-white/80 text-xs">{image.size}</p>
            </div>
          </div>
        </div>
      ))}
      {/* </div>
      )} */}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
            <DialogDescription>{selectedImage?.size}</DialogDescription>
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
  )
}
