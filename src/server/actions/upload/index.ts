'use server'

import { env } from '~/env'
import { minioClient } from '~/lib/minio'

const BUCKET_NAME = env.MINIO_BUCKET_NAME

type UploadResult = {
  success: boolean
  fileUrl?: string
  error?: string
}

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File
    if (!file) {
      throw new Error('No file provided')
    }

    const uniqueFileName = `images/${Date.now()}-${file.name}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Загружаем файл
    await minioClient.putObject(BUCKET_NAME, uniqueFileName, fileBuffer, file.size, {
      'Content-Type': file.type,
    })

    // Формируем прямую ссылку на файл
    const fileUrl = `https://${process.env.MINIO_ENDPOINT}/${BUCKET_NAME}/${uniqueFileName}`

    return {
      success: true,
      fileUrl,
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file',
    }
  }
}
