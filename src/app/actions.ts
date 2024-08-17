'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage, addNewPhrasePage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const resp = await fetchAuthInfo();

  // valid user
  if (resp.nativeLang) {
    return resp;
  }

  // User is not registered
  if (!resp.id) {
    return null;
  }

  const headerList = headers();
  const pathname = headerList.get('x-current-path');
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

  if (resp.id && resp.nativeLang && pathname === initProfilePage.path) {
    redirect(addNewPhrasePage.path);
  }

  return resp;
}
