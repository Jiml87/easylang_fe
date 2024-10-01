import { cookies } from 'next/headers';

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? '';
};

export default async function getAuthInfo() {
  try {
    const access_token = await getCookie('access_token');

    const res = await fetch(
      `${process.env.API_HOST}/api/v1/users/user-by-credentials`,
      {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          Cookie: `access_token=${access_token};`,
        },
      },
    );

    return res.json();
  } catch (error) {
    return null;
  }
}
