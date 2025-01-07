import { NextResponse } from 'next/server'
import { env } from '~/env'
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

    const uniqueFilename = `uploads/${Date.now()}-${filename}`

    const presignedUrl = await minioClient.presignedPutObject(BUCKET_NAME, uniqueFilename, 60 * 5)

    return NextResponse.json({
      success: true,
      presignedUrl,
      key: uniqueFilename,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
