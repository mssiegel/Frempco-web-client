import { useContext } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from '@contexts/UserContext';

// check if you are on the client (browser) or server
const isBrowser = () => typeof window !== 'undefined';

export default function CheckAuthentication({ children }) {
  const router = useRouter();
  const protectedRoutes = [
    '/teacher/classroom/[classroomName]',
    '/student/classroom/[classroomName]',
  ];

  const isProtectedPath = protectedRoutes.includes(router.pathname);

  const { user } = useContext(UserContext);
  const { isLoggedIn } = user;

  if (isBrowser() && isProtectedPath && !isLoggedIn) router.push('/');

  return children;
}
