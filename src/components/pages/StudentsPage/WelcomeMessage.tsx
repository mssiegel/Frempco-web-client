/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Link from '@components/shared/Link';
import welcomeMessageCSS from './WelcomeMessage.css';

export default function WelcomeMessage({
  classroomName,
  removedFromClass,
  socketId,
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const FIFTEEN_SECONDS = 15000;
  const [hasLostConnection, setHasLostConnection] = useState(false);

  useEffect(() => {
    // If a student's smartphone screen goes dark they will lose connection
    // to the server and will be removed from the server's classroom. When
    // the student reopens the website on their phone browser, they will see
    // a message to login again because of this setInterval().
    const connectionCheckInterval = setInterval(async () => {
      const getResponse = await fetch(
        `${apiUrl}/classrooms/${classroomName}/studentSockets/${socketId}`,
        { method: 'GET' },
      );
      const { isStudentInsideClassroom } = await getResponse.json();
      if (!isStudentInsideClassroom) {
        setHasLostConnection(true);
        clearInterval(connectionCheckInterval);
      }
    }, FIFTEEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, []);

  return (
    <Box css={welcomeMessageCSS.welcomeMessageContainer}>
      {removedFromClass || hasLostConnection ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            {removedFromClass
              ? 'Your teacher removed you.'
              : 'You were logged out.'}
          </Typography>
          <Typography variant='h4'>
            Return to the <Link href='/'>Frempco homepage</Link> and login
            again.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Welcome to classroom {classroomName}.
          </Typography>
          <Typography variant='h4'>Your teacher will pair you soon.</Typography>
        </>
      )}
    </Box>
  );
}
