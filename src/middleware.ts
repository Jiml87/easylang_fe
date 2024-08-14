'use server';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { JWK, JWS, util } from 'node-jose';
// import jwt from 'jsonwebtoken';

import { loginPage } from '@/config/routes';

// const TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7;

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET || '';

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value || '';
    if (!token) {
      throw new Error('Unauthorized');
    }
    let props = {
      alg: 'HS256',
      k: util.base64url.encode(AUTH_JWT_SECRET),
      kty: 'oct',
    };

    let key = await JWK.asKey(props);

    await JWS.createVerify(key).verify(token);
    // var decoded = jwt.verify(token, AUTH_JWT_SECRET);

    const headers = new Headers(request.headers);
    headers.set('x-current-path', request.nextUrl.pathname);
    return NextResponse.next({ headers });
  } catch (error) {
    if (request.nextUrl.pathname !== loginPage.path) {
      return NextResponse.redirect(
        new URL(
          loginPage.getPath({
            queries: { redirectTo: request.nextUrl.pathname },
          }),
          request.url,
        ),
      );
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/myapp/:path*',
};
