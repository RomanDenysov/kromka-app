import { betterFetch } from '@better-fetch/fetch'
import { type NextRequest, NextResponse } from 'next/server'
import type { Session } from './server/auth/auth'

// const authRoutes = ['/sign-in', '/login']
const adminRoutes = ['/admin/', '/admin']

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      //get the cookie from the request
      cookie: request.headers.get('cookie') || '',
    },
  })

  if (!session) {
    // if (isAuthRoute) {
    return NextResponse.next()
    // }
    // return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // if (isAuthRoute) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  if (isAdminRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If you want to allow all users (including guests), comment the following line and uncomment the next line
  // if (request.nextUrl.pathname === '/') {
  //   return request
  // }

  // If you want to allow all users (including guests), comment the following line and uncomment the previous line
  // return NextResponse.redirect(new URL('/sign-in', request.url))
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    // biome-ignore lint/nursery/noSecrets: <explanation>
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
