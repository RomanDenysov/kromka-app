export type FileConfig = {
  maxFileSize: string
  accept: string[]
}

export type UploadMetadata = {
  uploadedBy: string
  // TODO: add more metadata
}

export type UploadResult = {
  fileUrl: string
  // TODO: add more data if needed
}

export type UploadEndpoint = {
  config: {
    [key: string]: FileConfig
  }
  middleware: () => Promise<UploadMetadata>

  onUploadComplete: (args: {
    metadata: UploadMetadata
    file: UploadedFile
  }) => Promise<UploadResult>
}

export type UploadRouter = {
  [K: string]: UploadEndpoint
}

export interface UploadOptions {
  onUploadError?: (error: Error) => void
  onUploadComplete?: (res: UploadedFile[]) => void
  onUploadBegin?: (fileName: string) => void
}

export type UploadedFile = {
  url: string
  name: string
  size: string
  key: string
}

export type RouterInput = {
  [TKey: string]: FileConfig
}
