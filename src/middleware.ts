'use server';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: '/myapp/:path*',
};
