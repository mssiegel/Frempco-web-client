import { useState, useEffect } from 'react';

export default function CheckAuthentication({ router, children }) {
  const [userIsAuthorized, setUserIsAuth] = useState(false);
  const denyList = [
    '/teacher/classroom/[classroomName]',
    '/student/classroom/[classroomName]',
  ];

  /* Prevents Unauthorized Page Access to Teacher or Student Pages by checking what page the app starts on in the browser. If the app starts on a page in the denyList then the user is forced back to the homepage. This way all navigation to protected pages must happen from the homepage. */
  useEffect(() => {
    if (denyList.includes(router.pathname)) {
      window.location.assign('/');
    } else {
      setUserIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userIsAuthorized) return children;
  else return <></>;
}
