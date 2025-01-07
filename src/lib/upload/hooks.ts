'use client'

import { useState } from 'react'
import { env } from '~/env'
import type { UploadedFile, UploadOptions, UploadRouter } from './types'

const MINIO_ENDPOINT = env.NEXT_PUBLIC_MINIO_ENDPOINT
const MINIO_BUCKET = env.NEXT_PUBLIC_MINIO_BUCKET_NAME

if (!MINIO_ENDPOINT || !MINIO_BUCKET) {
  throw new Error('Missing required environment variables for upload')
}

async function getPresignedUrl(file: File, endpoint: string) {
  const presignedResult = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: file.name,
      fileType: file.type,
      endpoint,
    }),
  })

  if (!presignedResult.ok) {
    const errorData = (await presignedResult.json()) as { error: string }
    throw new Error(errorData.error || 'Failed to get upload URL')
  }

  return (await presignedResult.json()) as { presignedUrl: string; key: string }
}

async function uploadFileToMinIO(file: File, presignedUrl: string) {
  const uploadResult = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  if (!uploadResult.ok) {
    throw new Error('Failed to upload file')
  }
}

function createUploadedFile(file: File, key: string): UploadedFile {
  return {
    url: `https://${MINIO_ENDPOINT}/${MINIO_BUCKET}/${key}`,
    name: file.name,
    size: file.size.toString(),
    key,
  }
}

export function useUpload<TRouter extends UploadRouter>(
  endpoint: keyof TRouter,
  opts: UploadOptions = {},
) {
  const [isUploading, setUploading] = useState(false)

  const startUpload = async (files: File[]): Promise<UploadedFile[]> => {
    if (!files.length) {
      return []
    }

    setUploading(true)
    const uploadedFiles: UploadedFile[] = []

    try {
      for (const file of files) {
        opts.onUploadBegin?.(file.name)

        const { presignedUrl, key } = await getPresignedUrl(file, endpoint as string)
        await uploadFileToMinIO(file, presignedUrl)

        const uploadedFile = createUploadedFile(file, key)
        uploadedFiles.push(uploadedFile)
      }

      opts.onUploadComplete?.(uploadedFiles)
      return uploadedFiles
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown upload error')
      opts.onUploadError?.(err)
      throw err
    } finally {
      setUploading(false)
    }
  }

  return {
    isUploading,
    startUpload,
  }
}
