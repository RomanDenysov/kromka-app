import { betterFetch } from '@better-fetch/fetch';
import { type NextRequest, NextResponse } from 'next/server';
import type { Session } from './server/auth/auth';

// const authRoutes = ['/sign-in', '/login']
const ADMIN_PATTERN = /^\/admin(?:\/.*)?$/;

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const isAdminRoute = ADMIN_PATTERN.test(pathname);
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get('cookie') || '',
      },
    }
  );

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // biome-ignore lint/nursery/noSecrets: <explanation>
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/admin/:path*',
  ],
};
