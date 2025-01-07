import type { RouterInput, UploadMetadata, UploadResult } from './types'

export function createUploadRouter() {
  return function routerConfig<T extends RouterInput>(config: T) {
    return {
      middleware(fn: () => Promise<UploadMetadata>) {
        return {
          onUploadComplete(
            callback: (args: {
              metadata: UploadMetadata
              file: { url: string; key: string; name: string; size: string }
            }) => Promise<UploadResult>,
          ) {
            return {
              config,
              middleware: fn,
              onUploadComplete: callback,
            }
          },
        }
      },
    }
  }
}
