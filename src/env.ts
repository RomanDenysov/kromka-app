import { createEnv } from '@t3-oss/env-nextjs'
import { z, type ZodError } from 'zod'

const server: Parameters<typeof createEnv>[0]['server'] = {
  BETTER_AUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1).url(),
  BETTER_AUTH_URL: z.string().min(1).url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  EMAIL_USERNAME: z.string().min(1),
  EMAIL_HOST: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
}

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),

    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1).url(),

    DATABASE_URL: z.string().min(1).url(),

    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    EMAIL_USERNAME: z.string().min(1),
    EMAIL_HOST: z.string().min(1),
    EMAIL_PASSWORD: z.string().min(1),

    MINIO_ENDPOINT: z.string().min(1),
    MINIO_PORT: z.coerce.number().min(1).default(443),
    MINIO_USE_SSL: z.string().min(1) || 'false',
    MINIO_ACCESS_KEY: z.string().min(1),
    MINIO_SECRET_KEY: z.string().min(1),
    MINIO_BUCKET_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),

    NEXT_PUBLIC_MINIO_ENDPOINT: z.string().min(1),
    NEXT_PUBLIC_MINIO_BUCKET_NAME: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_USE_SSL: process.env.MINIO_USE_SSL,
    MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
    MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME,

    NEXT_PUBLIC_MINIO_ENDPOINT: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
    NEXT_PUBLIC_MINIO_BUCKET_NAME: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  onValidationError: (error: ZodError) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
    process.exit(1)
  },
})
