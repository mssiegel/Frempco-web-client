import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  currentTime,
  DEV_TEST_USER_QUERY_PARAM,
  PAIRED,
  SOLO,
  TEST_CLASSROOM_NAME,
} from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import WelcomeMessage from './WelcomeMessage';
import Header from './Header';
import LoginFlow from './LoginFlow';

export type ChatMessage = ['you' | 'peer', string];

export type SoloChatMessage = ['you' | 'chatbot', string];

export interface StudentPairedChat {
  mode: typeof PAIRED;
  characters: {
    you: string;
    peer: string;
  };
  conversation: ChatMessage[];
  startTime: string;
}

export interface StudentSoloChat {
  mode: typeof SOLO;
  characters: {
    you: string;
    peer: string;
  };
  conversation: SoloChatMessage[];
  startTime: string;
}

const DEV_TEST_USER_SESSION_FLAG = 'wasDevTestUserSet';

export default function StudentsPage(): JSX.Element {
  const socket = useContext(SocketContext);
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [studentName, setStudentName] = useState('');
  const [pin, setPin] = useState('');
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
  const [chatEndedMsg, setChatEndedMsg] = useState<null | string>(null);
  const router = useRouter();

  function addStudentToGameroom(studentName: string, pin: string) {
    socket.emit('new student entered', {
      student: studentName,
      classroom: pin,
    });
  }

  function initializeDevTestUser() {
    const randomStudentName = `Student ${Math.trunc(
      Math.random() * 10000,
    ).toString()}`;

    setStudentName(randomStudentName);
    setPin(TEST_CLASSROOM_NAME);
    addStudentToGameroom(randomStudentName, TEST_CLASSROOM_NAME);
    sessionStorage.setItem(DEV_TEST_USER_SESSION_FLAG, 'true');
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDevTestUserRequested =
      new URLSearchParams(window.location.search).get(
        DEV_TEST_USER_QUERY_PARAM,
      ) === 'true';
    // Persist this flag in sessionStorage (instead of React state) so
    // Next.js Fast Refresh after local saves does not create a new dev test
    // user. sessionStorage survives within the current tab session, so we
    // initialize only one dev test user per session.
    const hasInitializedDevTestUser =
      sessionStorage.getItem(DEV_TEST_USER_SESSION_FLAG) === 'true';

    if (isDevTestUserRequested && !hasInitializedDevTestUser) {
      initializeDevTestUser();
    }
  }, []);

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
    <main
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Header isMobile={isMobile} />
      </Box>
      <Box>
        {!studentName ? (
          <LoginFlow
            pin={pin}
            setPin={setPin}
            setStudentName={setStudentName}
            isMobile={isMobile}
            addStudentToGameroom={addStudentToGameroom}
          />
        ) : (
          <>
            {chatInSession ? (
              <Chatbox
                socket={socket}
                chat={chat}
                setChat={setChat}
                chatEndedMsg={chatEndedMsg}
                classroomName={pin}
                socketId={socket.id}
              />
            ) : (
              <WelcomeMessage
                pin={pin}
                removedFromClass={removedFromClass}
                socketId={socket.id}
                studentName={studentName}
                isMobile={isMobile}
              />
            )}
          </>
        )}
      </Box>
    </main>
  );
}
