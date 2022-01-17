import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';

interface StudentsPageProps {
  classroomName: string;
}

function currentTime() {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export default function StudentsPage({ classroomName }: StudentsPageProps) {
  const socket = useContext(SocketContext);

  const [chatInSession, setChatInSession] = useState(false);
  const [chat, setChat] = useState({
    you: '',
    peer: '',
    initialChar: '',
    conversation: [
      ['you', 'vampire', 'i need blood'],
      ['peer', 'wizard', 'i will cast a spell to make some'],
    ],
    startTime: '',
  });
  const [realChat, setRealChat] = useState<string[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('chat start', ({ yourCharacter, peersCharacter }) => {
        setChat((chat) => ({
          ...chat,
          you: yourCharacter,
          peer: peersCharacter,
          initialChar: yourCharacter,
          startTime: currentTime(),
        }));
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
      <Typography variant='h3' sx={{ color: 'white', mb: 4 }}>
        Hello student! Welcome to your classroom named {classroomName}! Your
        socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
      </Typography>
      {chatInSession && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chatbox socket={socket} chat={chat} setChat={setChat} />
        </Box>
      )}
    </main>
  );
}
