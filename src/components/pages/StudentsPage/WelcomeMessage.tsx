/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import Link from '@components/shared/Link';
import { useStudentInClassroom } from '@hooks/useStudentInClassroom';

interface WelcomeMessageProps {
  pin: string;
  removedFromClass: boolean;
  socketId: string;
  studentName: string;
  isMobile: boolean;
}

export default function WelcomeMessage({
  pin,
  removedFromClass,
  socketId,
  studentName,
  isMobile,
}: WelcomeMessageProps) {
  const isConnected = useStudentInClassroom(pin, socketId);

  return (
    <Box>
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
        align='center'
      >{`Hello ${studentName}`}</Typography>
      {removedFromClass || !isConnected ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }} align='center'>
            {removedFromClass
              ? 'Your teacher removed you.'
              : 'You were logged out.'}
          </Typography>
          <Typography variant='h4' align='center'>
            Return to the <Link href='/'>Frempco homepage</Link> and login
            again.
          </Typography>
        </>
      ) : (
        <Typography variant='body1' align='center'>
          Welcome to the game room! Your teacher will pair you soon...
        </Typography>
      )}
    </Box>
  );
}
