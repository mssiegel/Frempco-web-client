import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { ClassroomProps, currentTime, PAIRED, SOLO } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import Chatbox from './Chatbox';
import WelcomeMessage from './WelcomeMessage';
import RoleplayMasks from '../../../../public/roleplayMasks.png';
import { ChatMessage, SoloChatMessage } from '@components/pages/TeachersPage';

interface StudentPairedChat {
  mode: typeof PAIRED;
  characters: {
    you: string;
    peer: string;
  };
  conversation: ChatMessage[];
  startTime: string;
}

interface StudentSoloChat {
  mode: typeof SOLO;
  characters: {
    you: string;
    peer: string;
  };
  conversation: SoloChatMessage[];
  startTime: string;
}

export default function StudentsPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { name } = user;
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const [chatInSession, setChatInSession] = useState(false);
  const [removedFromClass, setRemovedFromClass] = useState(false);
  const [chat, setChat] = useState<StudentPairedChat | StudentSoloChat>();
  // { Example chat object:
  //   mode: 'PAIRED',
  //   characters: {
  //     you: 'your character',
  //     peer: 'peer character',
  //   },
  //   conversation: [
  //     // ['you', 'i need blood'],
  //     // ['peer', 'i will cast a spell to make some'],
  //   ],
  //   startTime: '',
  // }
  const [chatEndedMsg, setChatEndedMsg] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    if (socket) {
      socket.on('chat start', ({ yourCharacter, peersCharacter }) => {
        setChat({
          mode: PAIRED,
          characters: {
            you: yourCharacter,
            peer: peersCharacter,
          },
          conversation: [],
          startTime: currentTime(),
        });
        setChatInSession(true);
        setChatEndedMsg(null);
      });

      socket.on('solo mode: chat started', ({ character, messages }) => {
        setChat({
          mode: SOLO,
          characters: {
            you: character,
            peer: 'chatbot',
          },
          conversation: messages,
          startTime: currentTime(),
        });
        setChatInSession(true);
        setChatEndedMsg(null);
      });

      socket.on('remove student from classroom', () => {
        setRemovedFromClass(true);
        setChatInSession(false);
      });

      socket.on('peer left chat', () => {
        setChatEndedMsg('Your peer left the chat');
      });

      socket.on('teacher ended chat', () => {
        setChatEndedMsg('Your teacher ended your chat');
      });

      socket.on('solo mode: teacher ended chat', () => {
        setChatEndedMsg('Your teacher ended your chat');
      });
    }

    return () => {
      if (socket) {
        socket.off('chat start');
        socket.off('solo mode: chat started');
        socket.off('remove student from classroom');
        socket.off('peer left chat');
        socket.off('teacher ended chat');
        socket.off('solo mode: teacher ended chat');
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
          width={120}
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
          <Chatbox
            socket={socket}
            chat={chat}
            setChat={setChat}
            chatEndedMsg={chatEndedMsg}
            setChatEndedMsg={setChatEndedMsg}
          />
        ) : (
          <WelcomeMessage
            classroomName={classroomName}
            removedFromClass={removedFromClass}
            socketId={socket.id}
          />
        )}
      </Box>
    </main>
  );
}
