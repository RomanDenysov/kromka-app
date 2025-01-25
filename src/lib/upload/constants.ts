export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: '5MB',
  MAX_FILES: 9,
  RETRY_ATTEMPTS: 3,
  SUPPORTED_TYPES: {
    'image/png': ['.png'],
    'image/jpeg': ['.jpeg'],
    'image/jpg': ['.jpg'],
    'image/webp': ['.webp'],
  },
  UPLOAD_PATH: 'uploads/',
} as const
