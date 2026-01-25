/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

import Link from '@components/shared/Link';
import { useStudentInClassroom } from '@hooks/useStudentInClassroom';
import welcomeMessageCSS from './WelcomeMessage.css';

interface WelcomeMessageProps {
  classroomName: string;
  removedFromClass: boolean;
  socketId: string;
}

export default function WelcomeMessage({
  classroomName,
  removedFromClass,
  socketId,
} : WelcomeMessageProps) {
  const isConnected = useStudentInClassroom(classroomName, socketId);

  return (
    <Box css={welcomeMessageCSS.welcomeMessageContainer}>
      {removedFromClass || !isConnected ? (
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
