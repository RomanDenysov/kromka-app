'use client'

import { useState } from 'react'
import { env } from '~/env'
import type { FileData, UploadOptions, UploadRouter } from './types'

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

  const response = (await presignedResult.json()) as {
    presignedUrl: string
    key: string
  }
  if (!response.presignedUrl) {
    throw new Error('Failed to get upload URL')
  }

  return response
}

async function uploadFileToMinIO(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = (event.loaded / event.total) * 100
        onProgress(progress)
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`))
      }
    }

    xhr.onerror = () => reject(new Error('Upload failed'))
    xhr.open('PUT', presignedUrl)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)
  })
}

function createUploadedFile(file: File, key: string): FileData {
  return {
    url: `https://${MINIO_ENDPOINT}/${MINIO_BUCKET}/${key}`,
    name: file.name,
    size: file.size,
    key,
    type: file.type,
  }
}

export function useUpload<TRouter extends UploadRouter>(
  endpoint: keyof TRouter,
  opts: UploadOptions = {},
) {
  const [isUploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const startUpload = async (files: File[]): Promise<FileData[]> => {
    if (!files.length) {
      return []
    }

    setUploading(true)
    setProgress(0)

    const uploadedFiles: FileData[] = []

    try {
      for (const file of files) {
        opts.onUploadBegin?.(file.name)

        const { presignedUrl, key } = await getPresignedUrl(file, endpoint as string)
        await uploadFileToMinIO(file, presignedUrl, (progress) => {
          setProgress(progress)
          opts.onProgress?.(progress)
        })

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
      setProgress(0)
    }
  }

  return {
    isUploading,
    progress,
    startUpload,
  }
}
