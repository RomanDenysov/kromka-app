import {
  adminClient,
  anonymousClient,
  magicLinkClient,
  organizationClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    organizationClient(),
    adminClient(),
    anonymousClient(),
    magicLinkClient(),
  ],
});
