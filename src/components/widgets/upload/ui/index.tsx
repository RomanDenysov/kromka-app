'use client';

import { useState } from 'react';
import Dropzone, { type FileRejection } from 'react-dropzone';
import { Progress } from '~/components/ui/progress';
import { toast } from '~/hooks/use-toast';
import { useUpload } from '~/lib/upload/hooks';
import { ImageIcon, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { cn } from '~/lib/utils/cn';
import { useImagesUpload } from '../api/use-images-upload';

export const Upload = ({
  className,
  maxFiles = 9,
  onUploadComplete,
}: {
  className?: string;
  maxFiles?: number;
  onUploadComplete?: (fileUrl: string) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const { uploadImages, isLoading } = useImagesUpload();

  const { startUpload, isUploading, progress } = useUpload('image', {
    onUploadComplete: async (files) => {
      if (files.length > maxFiles) {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: `You can only upload up to ${maxFiles} files`,
        });
        return;
      }

      await uploadImages(files);

      if (files[0] && onUploadComplete) {
        onUploadComplete(files[0].url);
      }

      toast({
        title: 'Upload successful',
        description: 'Your file has been uploaded',
      });
    },
    onUploadError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message,
      });
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    toast({
      variant: 'destructive',
      title: 'Upload failed',
      description: `${file.file.type} type is not supported`,
    });
    setIsDragOver(false);
  };

  const onDropAccepted = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxFiles) {
      toast({
        variant: 'destructive',
        title: 'Upload limit exceeded',
        description: `Maximum ${maxFiles} files allowed`,
      });
      return;
    }
    setIsDragOver(false);
    await startUpload(acceptedFiles);
  };

  const getUploadZoneContent = () => {
    if (isUploading || isLoading) {
      return (
        <div className="text-center">
          <Loader2
            size={24}
            className="mx-auto mb-2 animate-spin text-zinc-500"
          />
          <p>Uploading...</p>
          <Progress
            className="mx-auto mt-2 h-2 w-40 bg-muted"
            value={progress}
          />
        </div>
      );
    }

    if (isDragOver) {
      return (
        <div className="text-center">
          <MousePointerSquareDashed
            size={24}
            className="mx-auto mb-2 text-zinc-500"
          />
          <p>
            <span className="font-semibold">Drop files</span> here to upload
          </p>
        </div>
      );
    }
    return (
      <div className="text-center">
        <ImageIcon size={24} className="mx-auto mb-2 text-zinc-500" />
        <p>Drag and drop files here, or click to select</p>
        <p className="mt-2 text-muted-foreground text-xs">
          PNG, JPG, JPEG, WEBP
        </p>
        <p className="text-muted-foreground text-xs">Max {maxFiles} files</p>
      </div>
    );
  };

  return (
    <Dropzone
      onDropRejected={onDropRejected}
      onDropAccepted={onDropAccepted}
      accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg'],
        'image/jpg': ['.jpg'],
        'image/webp': ['.webp'],
      }}
      maxSize={1024 * 1024 * 10} // 10 MB
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      maxFiles={maxFiles}
      disabled={isLoading || isUploading}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            'flex aspect-[21/6] size-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-border border-dashed p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary ',
            className
          )}
        >
          <input {...getInputProps()} />
          {getUploadZoneContent()}
        </div>
      )}
    </Dropzone>
  );
};
