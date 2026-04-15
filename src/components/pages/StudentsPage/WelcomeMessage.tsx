import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { Socket } from 'socket.io-client';

import Link from '@components/shared/Link';
import { useStudentInActivity } from './hooks/useStudentInActivity';

interface WelcomeMessageProps {
  activityPin: string;
  socketId: string;
  removedFromClass: boolean;
  studentName: string;
  isMobile: boolean;
}

export default function WelcomeMessage({
  activityPin,
  socketId,
  removedFromClass,
  studentName,
  isMobile,
}: WelcomeMessageProps) {
  const isStudentInActivity = useStudentInActivity(activityPin, socketId);
  const wasDisconnectedWhileWaiting = !isStudentInActivity;
  return (
    <Box textAlign='center'>
      <Image
        src='/StudentsPage/waiting-in-lobby.png'
        alt='Waiting in lobby'
        height={48}
        width={48}
        style={{ display: 'block', margin: 'auto' }}
      />
      <Typography
        variant={isMobile ? 'h4' : 'h1'}
        sx={{ py: 4 }}
      >{`Hello ${studentName}`}</Typography>
      {removedFromClass || wasDisconnectedWhileWaiting ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            {removedFromClass
              ? 'Your teacher removed you.'
              : 'You were disconnected when your device went dark.'}
          </Typography>
          <Typography variant='h4'>
            Return to the <Link href='/'>Frempco homepage</Link> and login
            again.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant='body1' sx={{ mx: 1 }}>
            Welcome to the activity! Your teacher will pair you soon...
          </Typography>
          {isMobile && (
            <Typography variant='body2' sx={{ mt: 2, mx: 1 }}>
              Note: You will be logged out of Frempco if your smartphone screen
              goes dark.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
