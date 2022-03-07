import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { ClassroomProps, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import Chatbox from './Chatbox';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function StudentsPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { name } = user;
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const [chatInSession, setChatInSession] = useState(false);
  const [chat, setChat] = useState({
    you: '',
    peer: '',
    initialChar: '',
    conversation: [
      // ['you', 'vampire', 'i need blood'],
      // ['peer', 'wizard', 'i will cast a spell to make some'],
    ],
    startTime: '',
  });

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    if (socket) {
      socket.on('chat start', ({ yourCharacter, peersCharacter }) => {
        setChat({
          you: yourCharacter,
          peer: peersCharacter,
          initialChar: yourCharacter,
          conversation: [],
          startTime: currentTime(),
        });
        setChatInSession(true);
      });
    }

    return () => {
      if (socket) {
        socket.off('chat start');
        router.events.off('routeChangeStart', handleRouteChange);
      }
    };
  }, [router.events, socket]);

  return (
    <main>
      <Typography variant='h4' sx={{ color: 'white', mb: 4 }}>
        Hello {name}! Welcome to your classroom: {classroomName}
      </Typography>
      {chatInSession && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chatbox socket={socket} chat={chat} setChat={setChat} />
        </Box>
      )}
    </main>
  );
}
