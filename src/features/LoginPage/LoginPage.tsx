'use client';
import { twMerge } from 'tailwind-merge';
import { Card } from 'primereact/card';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useRouter } from 'next/navigation';
import { initProfilePage, addNewPhrasePage } from '@/config/routes';

import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleLoginRequest, selectLoginState } from './loginSlice';

import './login.css';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector(selectLoginState);

  const responseMessage = (response: { code: string }) => {
    dispatch(googleLoginRequest(response)).then((data) => {
      if (data.payload.id) {
        // user is set up
        const path = data.payload.nativeLang
          ? addNewPhrasePage.path
          : initProfilePage.path;
        router.push(path);
      }
    });
  };
  const errorMessage = (error: any) => {
    console.log('error', error);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseMessage,
    onError: errorMessage,
    flow: 'auth-code',
  });

  return (
    <div className="flex h-dvh flex-col">
      <MainPageHeader />
      <div className="flex grow items-center justify-center px-4">
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
            <FacebookLogin
              appId="1257511625239605"
              callback={(resp: any) => console.log(resp)}
              responseType="code"
              fields="name,email,picture"
              render={(renderProps: any) => (
                <div
                  role="button"
                  onClick={renderProps.onClick}
                  className="socialBtn facebookBtn mt-4 flex w-full justify-center p-2 align-middle"
                >
                  Facebook
                </div>
              )}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
