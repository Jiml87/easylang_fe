import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { JWK, JWS, util } from 'node-jose';

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET || '';

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value || '';
    let props = {
      // use: 'sig',
      // kid: 'test-key',
      alg: 'HS256',
      k: util.base64url.encode(AUTH_JWT_SECRET),
      kty: 'oct',
    };

    let key = await JWK.asKey(props);
    await JWS.createVerify(key).verify(token);
    const headers = new Headers(request.headers);
    headers.set('x-current-path', request.nextUrl.pathname);
    return NextResponse.next({ headers });
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/login?redirectTo=${request.nextUrl.pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: '/myapp/:path*',
};
