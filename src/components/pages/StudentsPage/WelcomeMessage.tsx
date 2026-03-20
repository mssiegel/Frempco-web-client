/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { Socket } from 'socket.io-client';

import Link from '@components/shared/Link';

interface WelcomeMessageProps {
  pin: string;
  removedFromClass: boolean;
  socketId: string;
  socket: Socket;
  studentName: string;
  isMobile: boolean;
  addStudentToGameroom: (
    studentName: string,
    pin: string,
    updateStageToLobby?: boolean,
  ) => void;
}

export default function WelcomeMessage({
  pin,
  removedFromClass,
  socket,
  socketId,
  studentName,
  isMobile,
  addStudentToGameroom,
}: WelcomeMessageProps) {
  useEffect(() => {
    if (!socket || removedFromClass || !studentName || !pin) return;

    async function reconnectToGameroom() {
      const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

      try {
        const getResponse = await fetch(
          `${apiUrl}/classrooms/${pin}/studentSockets/${socketId}`,
          { method: 'GET' },
        );
        const { isStudentInsideClassroom } = await getResponse.json();

        if (!isStudentInsideClassroom) {
          const updateStageToLobby = false;
          addStudentToGameroom(studentName, pin, updateStageToLobby);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Keep students in the same classroom after a brief reconnect while in lobby.
    socket.on('connect', reconnectToGameroom);

    return () => {
      socket.off('connect', reconnectToGameroom);
    };
  }, [
    addStudentToGameroom,
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
        <Typography variant='body1'>
          Welcome to the game room! Your teacher will pair you soon...
        </Typography>
      )}
    </Box>
  );
}
