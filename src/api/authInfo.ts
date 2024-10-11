import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? '';
};

export default async function getAuthInfo() {
  try {
    const access_token = await getCookie('access_token');
    const url = `${process.env.API_HOST}/api/v1/users/user-by-credentials`;
    const response = await fetch(url, {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Cookie: `access_token=${access_token};`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}
