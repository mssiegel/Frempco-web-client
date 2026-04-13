import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { Socket } from 'socket.io-client';

import Link from '@components/shared/Link';

interface WelcomeMessageProps {
  pin: string;
  removedFromClass: boolean;
  isLobbyStage: boolean;
  socketId: string;
  socket: Socket;
  studentName: string;
  isMobile: boolean;
  addStudentToActivity: (
    studentName: string,
    pin: string,
    updateStageToLobby?: boolean,
  ) => void;
}

export default function WelcomeMessage({
  pin,
  removedFromClass,
  isLobbyStage,
  socket,
  socketId,
  studentName,
  isMobile,
  addStudentToActivity,
}: WelcomeMessageProps) {
  const isLobbyStageRef = useRef(isLobbyStage);

  useEffect(() => {
    isLobbyStageRef.current = isLobbyStage;
  }, [isLobbyStage]);

  useEffect(() => {
    if (!socket || removedFromClass || !studentName || !pin) return;

    async function reconnectToActivity() {
      const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

      try {
        const getResponse = await fetch(
          `${apiUrl}/activities/${pin}/studentSockets/${socketId}`,
          { method: 'GET' },
        );
        const { isStudentInsideActivity } = await getResponse.json();

        // Use a ref so this async callback reads the latest stage, not a stale closure value.
        if (!isStudentInsideActivity && isLobbyStageRef.current) {
          const updateStageToLobby = false;
          addStudentToActivity(studentName, pin, updateStageToLobby);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Keep students in the same activity after a brief reconnect while in lobby.
    socket.on('connect', reconnectToActivity);

    return () => {
      socket.off('connect', reconnectToActivity);
    };
  }, [
    addStudentToActivity,
    pin,
    removedFromClass,
    socket,
    socketId,
    studentName,
  ]);

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
      {removedFromClass ? (
        <>
          <Typography variant='h4' sx={{ mb: 4 }}>
            Your teacher removed you.
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
