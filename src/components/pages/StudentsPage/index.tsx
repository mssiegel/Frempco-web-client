import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { ClassroomProps, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import Chatbox from './Chatbox';
import WelcomeMessage from './WelcomeMessage';
import RoleplayMasks from '../../../../public/roleplayMasks.png';

export default function StudentsPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { name } = user;
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const [chatInSession, setChatInSession] = useState(false);
  const [removedFromClass, setRemovedFromClass] = useState(false);
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

      socket.on('remove student from classroom', () => {
        setRemovedFromClass(true);
        setChatInSession(false);
      });
    }

    return () => {
      if (socket) {
        socket.off('chat start');
        socket.off('remove student from classroom');
        router.events.off('routeChangeStart', handleRouteChange);
      }
    };
  }, [router.events, socket]);

  return (
    <main>
      <Typography variant='h4' textAlign='center' my={1}>
        Frempco
      </Typography>
      <Box m={1} display='flex' justifyContent='center'>
        <Image
          src={RoleplayMasks}
          alt='Roleplaying masks'
          priority={true}
          width={80}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
      <Typography
        variant='h4'
        sx={{ color: 'black', mb: 4, textAlign: 'center' }}
      >
        {`Hello ${name}.`}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {chatInSession ? (
          <Chatbox socket={socket} chat={chat} setChat={setChat} />
        ) : (
          <WelcomeMessage
            classroomName={classroomName}
            removedFromClass={removedFromClass}
          />
        )}
      </Box>
    </main>
  );
}
