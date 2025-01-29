'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { type ReactNode, useEffect } from 'react';
import { env } from '~/env';
// import SuspendedPostHogPageView from '~/lib/posthog';

type Props = {
  readonly children: ReactNode;
};

export function PostHogProvider({ children }: Props) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      {/* <SuspendedPostHogPageView /> */}
      {children}
    </PHProvider>
  );
}
