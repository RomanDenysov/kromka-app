import { type ReactNode, Suspense } from 'react'
import { Toaster } from '~/components/ui/toaster'
import { CookieBanner } from '~/components/widgets/cookie-banner'
import { TRPCReactProvider } from '~/trpc/react'
import { PostHogProvider } from './posthog-provider'
import { SheetsProvider } from './sheets-provider'
import { ThemeProvider } from './theme-provider'

type Props = {
  readonly children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <TRPCReactProvider>
      <PostHogProvider>
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme="light"
          enableSystem
        >
          {/* <SheetsProvider /> */}
          <Suspense>
            <SheetsProvider />
          </Suspense>
          <Suspense>
            <CookieBanner />
          </Suspense>
          {children}
          <Toaster />
        </ThemeProvider>
      </PostHogProvider>
    </TRPCReactProvider>
  )
}
