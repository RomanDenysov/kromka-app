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
  },
  client: {
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
  },
  runtimeEnv: {
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
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  onValidationError: (error: ZodError) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
    process.exit(1)
  },
})
