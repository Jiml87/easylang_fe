'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage, addNewPhrasePage, loginPage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const data = await fetchAuthInfo();
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  console.log('data', data);

  // TODO: no response from api server

  // user is eady
  if (data?.id && data.nativeLang) {
    return data;
  }

  //  User is valid
  if (data?.id && data.nativeLang) {
    // User tries opening initial user account page
    if (pathname === initProfilePage.path) {
      redirect(addNewPhrasePage.path);
    }
    return data;
  }

  // User is not unauthorized
  if (data?.statusCode === 401 && pathname?.indexOf('/myapp/') === 0) {
    redirect(loginPage.path);
  }

  // User is registered but profile has not been finished
  if (
    data?.id &&
    !data.nativeLang &&
    pathname?.indexOf('/myapp/') === 0 &&
    pathname !== initProfilePage.path
  ) {
    redirect(initProfilePage.path);
  }

  return null;
}
