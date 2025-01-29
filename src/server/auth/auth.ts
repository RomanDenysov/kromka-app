import { betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { anonymous, magicLink, openAPI } from 'better-auth/plugins';
import posthog from 'posthog-js';

import { env } from '~/env';
import { sendMagicLinkEmail } from '~/lib/email';
import { log } from '~/lib/utils/log';
import { db } from '~/server/db';
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as schema from '~/server/db/schema';

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
  plugins: [
    openAPI(),
    nextCookies(),
    anonymous(),
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        await log.info(
          `Sending magic link to ${email} with token ${token} and url ${url}`
        );
        posthog.capture('magic-link-sent', {
          email,
        });
        await sendMagicLinkEmail(email, url);
      },
    }),
  ],
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
});

export type Session = typeof auth.$Infer.Session;
