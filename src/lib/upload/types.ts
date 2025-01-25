export type FileConfig = {
  maxFileSize: string
  accept: string[]
}

export type RouterInput = {
  [TKey: string]: FileConfig
}

export type UploadMetadata = {
  uploadedBy: string
  // TODO: add more metadata
}

export type FileData = {
  name: string
  size: number
  url: string
  key: string
  type: string
}

export type UploadResult = FileData & UploadMetadata

export interface UploadOptions {
  onUploadError?: (error: Error) => void
  onUploadComplete?: (res: FileData[]) => void
  onUploadBegin?: (fileName: string) => void
  onProgress?: (progress: number) => void
}
export type UploadEndpoint = {
  config: RouterInput
  middleware: () => Promise<UploadMetadata>
  onUploadComplete: (args: { metadata: UploadMetadata; file: FileData }) => Promise<UploadResult>
}

export type UploadRouter = {
  [K: string]: UploadEndpoint
}
