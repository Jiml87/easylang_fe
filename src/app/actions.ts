'use server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import fetchAuthInfo from '@/api/authInfo';
import { UserProfile } from '@/types/auth';
import { initProfilePage } from '@/config/routes';

export async function getAuthInfo(): Promise<UserProfile | null> {
  const user = await fetchAuthInfo();
  console.log('user', user);

  // User is not registered
  if (!user.id) {
    return null;
  }

  //TODO: Move this this logic to UI. Remove header x-current-path in middleware
  // User is registered but did not set up profile
  if (!user.nativeLang) {
    const headerList = headers();
    const pathname = headerList.get('x-current-path');
    if (
      pathname?.indexOf('/myapp/') === 0 &&
      pathname?.indexOf(initProfilePage.path) === -1
    ) {
      redirect(initProfilePage.path);
    }
    return null;
  }

  return user;
}
