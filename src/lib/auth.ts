import { betterAuth } from 'better-auth'

import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, anonymous, openAPI, organization } from 'better-auth/plugins'

import { db } from '~/db'
import * as schema from '~/db/schema'
import { env } from '~/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
    },
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [openAPI(), nextCookies(), organization(), admin(), anonymous()],
  account: {
    accountLinking: {
      enabled: true,
      strategies: ['email'],
      trustedProviders: ['google'],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
})

export type Session = typeof auth.$Infer.Session
