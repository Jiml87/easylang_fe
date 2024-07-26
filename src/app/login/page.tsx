'use client';
import React from 'react';
import MainPageHeader from '@/components/MainPageHeader/MainPageHeader';
import { Card } from 'primereact/card';
import { GoogleLogin, GoogleCredentialResponse } from '@react-oauth/google';

// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { googleLoginRequest, selectLoginState } from '@/app/login/loginSlice';

const LoginPage = () => {
  // const dispatch = useAppDispatch();
  // const loginState = useAppSelector(selectLoginState);
  const responseMessage = (response: GoogleCredentialResponse) => {
    console.log(response);
    // dispatch(googleLoginRequest(response));
  };
  const errorMessage = () => {
    console.log('error');
  };
  return (
    <div className="h-dvh flex flex-col">
      <MainPageHeader />
      <div className="flex grow items-center justify-center px-4">
        <Card className="w-full">
          <h1 className="flex justify-center">Login</h1>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
