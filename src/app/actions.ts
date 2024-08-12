'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage, addNewPhrasePage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const user = await fetchAuthInfo();
  console.log('user', user);

  // User is not registered
  if (!user.id) {
    return null;
  }

  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  //TODO: Move this this logic to UI. Remove header x-current-path in middleware
  // User is registered but profile has not been finished
  if (
    !user.nativeLang &&
    pathname?.indexOf('/myapp/') === 0 &&
    pathname !== initProfilePage.path
  ) {
    redirect(initProfilePage.path);
    return user;
  }

  if (user.nativeLang && pathname === initProfilePage.path) {
    redirect(addNewPhrasePage.path);
    return user;
  }

  return user;
}
