import 'server-only'

import { Client } from 'minio'
import { env } from '~/env'

export const minioClient = new Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: env.MINIO_USE_SSL === 'true',
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
})

export async function initializeBucket() {
  const bucketName = process.env.MINIO_BUCKET_NAME || 'kromka'

  try {
    const exists = await minioClient.bucketExists(bucketName)
    if (!exists) {
      await minioClient.makeBucket(bucketName)

      // Устанавливаем политику для публичного доступа к файлам
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      }

      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy))
    }
  } catch (error) {
    console.error('Error initializing bucket:', error)
  }
}

if (env.NODE_ENV === 'production') {
  initializeBucket().catch(console.error)
}
