import { NextResponse } from 'next/server'
import { env } from '~/env'
import { log } from '~/lib/utils/log'
import { minioClient } from '~/lib/minio'
import { uploadRouter } from '~/lib/upload/config'
import type { UploadEndpoint } from '~/lib/upload/types'

const BUCKET_NAME = env.MINIO_BUCKET_NAME || 'kromka'

export async function POST(req: Request) {
  try {
    const { filename, fileType, endpoint } = await req.json()

    const route = uploadRouter[endpoint as keyof typeof uploadRouter] as UploadEndpoint | undefined
    if (!route) {
      return NextResponse.json({ error: 'Upload endpoint not found' }, { status: 404 })
    }

    const isAllowedType = Object.values(route.config).some((config) =>
      config.accept.includes(fileType),
    )
    if (!isAllowedType) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
    }

    // Безопасное имя файла
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const uniqueFilename = `uploads/${Date.now()}-${safeFilename}`

    const presignedUrl = await minioClient.presignedPutObject(BUCKET_NAME, uniqueFilename, 60 * 5)

    return NextResponse.json({
      success: true,
      presignedUrl,
      key: uniqueFilename,
    })
  } catch (error) {
    log.error(`Error generating presigned URL: ${error}`)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { key } = await req.json()

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Invalid key provided' }, { status: 400 })
    }
    // Проверяем, что ключ начинается с uploads/ для безопасности
    if (!key.startsWith('uploads/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    await minioClient.removeObject(BUCKET_NAME, key)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
