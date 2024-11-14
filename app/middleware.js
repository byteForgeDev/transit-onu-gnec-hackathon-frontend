import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the user is authenticated by looking for a token or auth cookie
  const isAuth = request.cookies.get('isSignedIn') // Adjust this as needed based on your authentication logic

  // Redirect unauthenticated users to the login page if they are accessing the home page
  if (!isAuth && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  return NextResponse.next()
}
