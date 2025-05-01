import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth-token')?.value

  // If the user is not authenticated and trying to access protected routes
  if (!authToken && !request.nextUrl.pathname.startsWith('/auth')) {
    console.log('Redirecting to login page')
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  
  // If the user is authenticated and trying to access login page
  if (authToken && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 