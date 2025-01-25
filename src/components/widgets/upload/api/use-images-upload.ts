'use client';

import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { toast } from '~/hooks/use-toast';
import type { FileData } from '~/lib/upload/types';
import { formatFileSize } from '~/lib/upload/utils';
import { api } from '~/trpc/react';

export const useImagesUpload = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const uploadImageMutation = api.images.upload.useMutation({
    onSuccess: () => {
      toast({
        title: 'Upload successful',
        description: 'Your file has been uploaded',
      });
      utils.images.invalidate();
      revalidatePath('/admin/media');
      router.refresh();
    },
  });

  const uploadImages = async (files: FileData[]) => {
    try {
      // Загружаем все файлы параллельно
      await Promise.all(
        files.map((file) =>
          uploadImageMutation.mutateAsync({
            name: file.name,
            url: file.url,
            key: file.key,
            size: formatFileSize(file.size),
            mimeType: file.type,
          })
        )
      );

      toast({
        title: 'Upload successful',
        description: 'Your files have been uploaded',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description:
          error instanceof Error ? error.message : 'Failed to upload files',
      });
    }
  };

  return {
    isLoading: uploadImageMutation.isPending,
    uploadImages,
  };
};
