'use client';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card } from 'primereact/card';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter, useSearchParams } from 'next/navigation';
import { initProfilePage, addNewPhrasePage } from '@/config/routes';
import { ShadowSpinner } from '@/components/ShadowSpinner/ShadowSpinner';
import { API_URL } from '@/constants/env';

import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleLoginRequest, selectLoginState } from './loginSlice';

import './login.css';

const MCP_OAUTH_RETURN_TO_KEY = 'mcp_oauth_return_to';

function isAllowedAuthorizeOrigin(origin: string): boolean {
  const allowed = new Set([
    'https://mywords.pro',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
  ]);
  if (API_URL) {
    try {
      allowed.add(new URL(API_URL).origin);
    } catch {}
  }
  if (typeof window !== 'undefined') {
    allowed.add(window.location.origin);
  }
  return allowed.has(origin);
}

function normalizeAuthorizeReturnTo(value: string | null): string | null {
  if (!value || typeof window === 'undefined') {
    return null;
  }
  try {
    if (value.startsWith('//')) {
      return null;
    }
    const url = new URL(value, window.location.origin);
    if (url.pathname !== '/authorize') {
      return null;
    }
    if (!value.startsWith('/') && !isAllowedAuthorizeOrigin(url.origin)) {
      return null;
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

function readAuthorizeReturnTo(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return normalizeAuthorizeReturnTo(
    new URLSearchParams(window.location.search).get('return_to') ||
      sessionStorage.getItem(MCP_OAUTH_RETURN_TO_KEY),
  );
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading } = useAppSelector(selectLoginState);

  useEffect(() => {
    const value = normalizeAuthorizeReturnTo(searchParams.get('return_to'));
    if (value) {
      sessionStorage.setItem(MCP_OAUTH_RETURN_TO_KEY, value);
    }
  }, [searchParams]);

  const goToApp = (nativeLang: unknown) => {
    const path = nativeLang ? addNewPhrasePage.path : initProfilePage.path;
    router.push(path);
  };

  const responseMessage = (response: { code: string }) => {
    const returnTo = readAuthorizeReturnTo();
    dispatch(googleLoginRequest(response)).then((data) => {
      if (data.meta.requestStatus !== 'fulfilled' || !data.payload?.id) {
        return;
      }
      if (returnTo) {
        sessionStorage.removeItem(MCP_OAUTH_RETURN_TO_KEY);
        window.location.assign(returnTo);
        return;
      }
      goToApp(data.payload.nativeLang);
    });
  };

  const errorMessage = (error: any) => {
    console.error('error', error);
  };

  const startGoogleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
    flow: 'auth-code',
  });

  const handleGoogleLogin = () => {
    const value = readAuthorizeReturnTo();
    if (value) {
      sessionStorage.setItem(MCP_OAUTH_RETURN_TO_KEY, value);
    }
    startGoogleLogin();
  };

  return (
    <div className="flex h-dvh flex-col">
      <MainPageHeader />
      <div className="flex grow items-center justify-center px-4">
        <ShadowSpinner isLoading={isLoading} className="w-full max-w-md">
          <Card
            className={twMerge(
              'w-full max-w-md',
              isLoading && 'pointer-events-none',
            )}
          >
            <h1 className="prose-headings:h1 prose mb-7 flex justify-center text-2xl font-bold">
              Sign In
            </h1>
            <div>
              <div
                role="button"
                onClick={handleGoogleLogin}
                className="socialBtn googleBtn mt-5 flex w-full justify-center p-2 align-middle"
              >
                Google
              </div>
              {/* <a
                href="/api/v1/auth/facebook/login"
                className="socialBtn facebookBtn mt-4 flex w-full justify-center p-2 align-middle"
              >
                Facebook
              </a> */}
            </div>
          </Card>
        </ShadowSpinner>
      </div>
    </div>
  );
};
