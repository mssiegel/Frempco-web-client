import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
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
}

export interface StudentSoloChat {
  mode: typeof SOLO;
  characters: {
    you: string;
    peer: string;
  };
  conversation: SoloChatMessage[];
}

export type Stage =
  | 'joining'
  | 'lobby'
  | 'chatting'
  | 'chatEnded'
  | 'removedByTeacher';

export const STAGE = {
  joining: 'joining',
  lobby: 'lobby',
  chatting: 'chatting',
  chatEnded: 'chatEnded',
  removedByTeacher: 'removedByTeacher',
} as const;

const DEV_TEST_USER_SESSION_FLAG = 'wasDevTestUserSet';

export default function StudentsPage(): JSX.Element {
  const socket = useContext(SocketContext);
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [studentName, setStudentName] = useState('');
  const [pin, setPin] = useState('');
  const [stage, setStage] = useState<Stage>(STAGE.joining);
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
  // }
  const [chatEndedMsg, setChatEndedMsg] = useState<null | string>(null);
  const router = useRouter();
  const headerStatusTextMap: Record<Stage, string> = {
    [STAGE.joining]: 'Join a Game',
    [STAGE.lobby]: 'Waiting in Lobby',
    [STAGE.chatting]: 'Chatting with someone',
    [STAGE.chatEnded]: 'Chat ended',
    [STAGE.removedByTeacher]: 'Removed by teacher',
  };
  const headerStatusText = headerStatusTextMap[stage];

  function addStudentToGameroom(studentName: string, pin: string) {
    socket.emit('new student entered', {
      student: studentName,
      classroom: pin,
    });
    setStage(STAGE.lobby);
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
    if (!socket) return;

    const handleRouteChange = (url, { shallow }) => {
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    function reconnectToGameroom() {
      if (stage === STAGE.lobby && studentName && pin) {
        addStudentToGameroom(studentName, pin);
      }
    }

    // If a student in the lobby stage briefly loses internet, auto-rejoining
    // keeps them in the same classroom without forcing a fresh login.
    socket.on('connect', reconnectToGameroom);

    socket.on('chat start', ({ yourCharacter, peersCharacter }) => {
      setChat({
        mode: PAIRED,
        characters: {
          you: yourCharacter,
          peer: peersCharacter,
        },
        conversation: [],
      });
      setStage(STAGE.chatting);
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
      });
      setStage(STAGE.chatting);
      setChatEndedMsg(null);
    });

    socket.on('remove student from classroom', () => {
      setStage(STAGE.removedByTeacher);
    });

    socket.on('peer left chat', () => {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your peer left the chat');
    });

    socket.on('teacher ended chat', () => {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your teacher ended your chat');
    });

    socket.on('solo mode: teacher ended chat', () => {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your teacher ended your chat');
    });

    return () => {
      socket.off('connect', reconnectToGameroom);
      socket.off('chat start');
      socket.off('solo mode: chat started');
      socket.off('remove student from classroom');
      socket.off('peer left chat');
      socket.off('teacher ended chat');
      socket.off('solo mode: teacher ended chat');
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [pin, router.events, socket, stage, studentName]);

  return (
    <main
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        background:
          'var(--Gradients, linear-gradient(180deg, #FFF 0%, #EBECFE 100%))',
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Header
          isMobile={isMobile}
          statusText={headerStatusText}
          studentName={studentName || undefined}
        />
      </Box>
      {stage === STAGE.joining ? (
        <LoginFlow
          pin={pin}
          setPin={setPin}
          setStudentName={setStudentName}
          isMobile={isMobile}
          addStudentToGameroom={addStudentToGameroom}
        />
      ) : (
        <>
          {stage === STAGE.chatting || stage === STAGE.chatEnded ? (
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
              removedFromClass={stage === STAGE.removedByTeacher}
              socketId={socket.id}
              studentName={studentName}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </main>
  );
}
