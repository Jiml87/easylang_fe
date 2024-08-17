'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage, addNewPhrasePage, loginPage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const resp = await fetchAuthInfo();
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  console.log('resp', resp);

  // valid user
  if (resp.id && resp.nativeLang) {
    if (pathname === initProfilePage.path) {
      redirect(addNewPhrasePage.path);
    }
    return resp;
  }

  // User is not registered
  if (!resp.id) {
    // TODO: fix validation jwt in middleware and remove this condition
    if (resp.statusCode === 401 && pathname?.indexOf('/myapp/') === 0) {
      redirect(loginPage.path);
    }
    return null;
  }

  //TODO: Move this this logic to UI. Remove header x-current-path in middleware
  // User is registered but profile has not been finished
  if (
    resp.id &&
    !resp.nativeLang &&
    pathname?.indexOf('/myapp/') === 0 &&
    pathname !== initProfilePage.path
  ) {
    redirect(initProfilePage.path);
  }

  return resp;
}
