import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { ClassroomProps, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';

export default function StudentsPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
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

  useEffect(() => {
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
      }
    };
  });

  return (
    <main>
      <Typography variant='h4' sx={{ color: 'white', mb: 4 }}>
        Hello student! Welcome to your classroom: {classroomName}
      </Typography>
      {chatInSession && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chatbox socket={socket} chat={chat} setChat={setChat} />
        </Box>
      )}
    </main>
  );
}
