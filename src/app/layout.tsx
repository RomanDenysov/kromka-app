import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import Providers from '~/providers';

const GEIST_SANS = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const GEIST_MONO = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

type Props = {
  readonly children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${GEIST_SANS.variable} ${GEIST_MONO.variable} relative font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
