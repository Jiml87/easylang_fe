'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage, addNewPhrasePage, rootPage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const resp = await fetchAuthInfo();
  const headerList = headers();
  const pathname = headerList.get('x-current-path');

  //  User is valid
  if (resp.id && resp.nativeLang) {
    // User tries opening initial user account page
    if (pathname === initProfilePage.path) {
      redirect(addNewPhrasePage.path);
    }
    return resp;
  }

  // User is not registered
  if (!resp.id) {
    // User is not unauthorized
    if (resp.statusCode === 401 && pathname?.indexOf('/myapp/') === 0) {
      redirect(rootPage.path);
    }
    return null;
  }

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
