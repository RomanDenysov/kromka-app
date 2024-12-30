'use client'

import { ImageIcon, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useState, useTransition } from 'react'
import Dropzone from 'react-dropzone'
import { Progress } from '~/components/ui/progress'
import { cn } from '~/lib/utils'

export const Upload = ({ className }: { className?: string }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [uploadProgress, setUploadProgress] = useState(0)
  const isUploading = false

  const onDropRejected = () => {}
  const onDropAccepted = () => {}

  return (
    <div>
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
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={cn(
              'flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-border border-dashed p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary',
              className,
            )}
          >
            <input {...getInputProps()} />
            {isDragOver ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
            {isDragOver ? (
              <MousePointerSquareDashed size={24} className="mb-2 text-zinc-500" />
            ) : isUploading || isPending ? (
              <Loader2 size={24} className="mb-2 animate-spin text-zinc-500 " />
            ) : (
              <ImageIcon size={24} className="mb-2 text-zinc-500" />
            )}
            <div className="mb-2 flex flex-col items-center justify-center text-muted-foreground text-sm">
              {isUploading ? (
                <div>
                  <p>Uploading...</p>
                  <Progress className="mt-2 h-2 w-40 bg-muted" value={uploadProgress} />
                </div>
              ) : isPending ? (
                <div className="flex flex-col items-center">
                  <p>Processing, please wait...</p>
                </div>
              ) : isDragOver ? (
                <p>
                  <span className="font-semibold">Drop files</span> here to upload
                </p>
              ) : (
                <p>
                  Click to <span className="font-semibold">upload</span> or drag and drop
                </p>
              )}
            </div>

            {isPending ? null : (
              <p className="text-muted-foreground text-xs">PNG, JPG, JPEG, WEBP</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  )
}
