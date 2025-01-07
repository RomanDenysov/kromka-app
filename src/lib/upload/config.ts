import { headers } from 'next/headers'
import { auth } from '../auth'
import { createUploadRouter } from './router'
import type { UploadRouter } from './types'

const upload = createUploadRouter()

export const uploadRouter: UploadRouter = {
  image: upload({
    image: {
      maxFileSize: '5mb',
      accept: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    },
  })
    // biome-ignore lint/suspicious/useAwait: <explanation>
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
      console.log('Upload complete', { metadata, file })
      return { fileUrl: file.url, name: file.name, size: file.size, key: file.key }
    }),
}
