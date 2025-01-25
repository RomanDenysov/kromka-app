import { headers } from 'next/headers'
import { auth } from '../../server/auth/auth'
import { log } from '../utils/log'
import { createUploadRouter } from './router'
import type { UploadRouter } from './types'

const upload = createUploadRouter()

export const uploadRouter: UploadRouter = {
  image: upload({
    // TODO: move this to the config file
    image: {
      maxFileSize: '5mb',
      accept: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() })
      if (!session || !session.user) {
        throw new Error('Unauthorized')
      }
      // TODO: Implement user auth and check if user is logged in and has permission to upload files
      return { uploadedBy: session.user.id }
    })

    // biome-ignore lint/suspicious/useAwait: <explanation>
    .onUploadComplete(async ({ metadata, file }) => {
      log.info(`Upload complete: ${file} & ${metadata}`)
      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        name: file.name,
        size: file.size,
        key: file.key,
        type: file.type,
      }
    }),

  document: upload({
    document: {
      maxFileSize: '10mb',
      accept: ['application/pdf', 'application/msword'],
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() })

      if (!session?.user) {
        throw new Error('Unauthorized')
      }

      return {
        uploadedBy: session.user.id,
      }
    })

    // biome-ignore lint/suspicious/useAwait: <explanation>
    .onUploadComplete(async ({ metadata, file }) => {
      log.info(`Upload complete: ${file} & ${metadata}`)
      return {
        uploadedBy: metadata.uploadedBy,
        url: file.url,
        name: file.name,
        size: file.size,
        key: file.key,
        type: file.type,
      }
    }),
}
