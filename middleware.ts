import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Check if request is coming through an admin/studio subdomain (e.g. app.tradesqr.com, studio.tradesqr.com)
  const isStudioSubdomain =
    hostname.startsWith('app.') ||
    hostname.startsWith('studio.') ||
    hostname.startsWith('admin.')

  if (isStudioSubdomain) {
    // If accessing root or paths on the subdomain, rewrite to /studio
    if (!url.pathname.startsWith('/studio')) {
      const targetPath = url.pathname === '/' ? '/studio' : `/studio${url.pathname}`
      return NextResponse.rewrite(new URL(targetPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
