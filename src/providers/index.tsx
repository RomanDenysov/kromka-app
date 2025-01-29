import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';
import { Toaster } from '~/components/ui/toaster';
import { ConfirmDialog } from '~/components/widgets/confirm-dialog/ui';
import { CookieBanner } from '~/components/widgets/cookie-banner';
import { TRPCReactProvider } from '~/trpc/react';
import { PostHogProvider } from './posthog-provider';
import { SheetsProvider } from './sheets-provider';
import { ThemeProvider } from './theme-provider';

type Props = {
  readonly children: ReactNode;
};

export default async function Providers({ children }: Props) {
  const messages = await getMessages();

  return (
    <TRPCReactProvider>
      <PostHogProvider>
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme="light"
          enableSystem
        >
          <NextIntlClientProvider messages={messages}>
            {/* <SheetsProvider /> */}
            <Suspense>
              <SheetsProvider />
            </Suspense>
            <Suspense>
              <CookieBanner />
            </Suspense>
            {children}
            <Toaster />
            <ConfirmDialog />
          </NextIntlClientProvider>
        </ThemeProvider>
      </PostHogProvider>
    </TRPCReactProvider>
  );
}
