import type { FileData, RouterInput, UploadMetadata, UploadResult } from './types'

export function createUploadRouter() {
  return function routerConfig<T extends RouterInput>(config: T) {
    return {
      middleware(fn: () => Promise<UploadMetadata>) {
        return {
          onUploadComplete(
            callback: (args: { metadata: UploadMetadata; file: FileData }) => Promise<UploadResult>,
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
